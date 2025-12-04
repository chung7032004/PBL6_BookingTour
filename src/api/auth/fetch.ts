import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../url';
import { logout } from './login';

interface RetryableRequestInit extends RequestInit {
  _retry?: boolean;
}
// 2. Định nghĩa Interface cho các hàm API, cho phép truyền object cho body
interface ApiFetchOptions extends Omit<RetryableRequestInit, 'body'> {
  body?: any;
}

export function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 5000,
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout),
    ),
  ]);
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token!);
  });
  failedQueue = [];
};
async function refreshToken(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const res = await fetch(url + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('Refresh token failed with status:' + res.status);
    }

    const text = await res.text();
    if (!text) {
      throw new Error('Refresh response empty');
    }

    const data = JSON.parse(text);
    if (!data?.accessToken) {
      throw new Error('No accessToken in response');
    }
    await AsyncStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } catch (error) {
    processQueue(error);
    await logout();
    return null;
  } finally {
    isRefreshing = false;
  }
}

export async function fetchWithAuth(
  endpoint: string,
  options: RetryableRequestInit = {},
): Promise<Response> {
  const isRetry = !!options._retry;
  let accessToken = await AsyncStorage.getItem('accessToken');

  // Tạo headers mới
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  // Nếu là FormData → KHÔNG set Content-Type (browser sẽ tự thêm boundary)
  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const finalOptions: RequestInit = {
    ...options,
    headers,
  };

  let response = await fetchWithTimeout(url + endpoint, finalOptions);

  // Xử lý 401 → refresh token → retry 1 lần
  if (response.status === 401 && !isRetry) {
    console.log('Token hết hạn, đang refresh...');
    const newToken = await refreshToken();

    if (!newToken) {
      console.log('Refresh thất bại → đăng xuất');
      await logout();
      return response; // trả về 401 để app xử lý chuyển sang login
    }

    // Tái tạo headers với token mới
    const retryHeaders = new Headers(options.headers || {});
    if (!isFormData) retryHeaders.set('Content-Type', 'application/json');
    retryHeaders.set('Authorization', `Bearer ${newToken}`);

    const retryOptions: RetryableRequestInit = {
      ...options,
      headers: retryHeaders,
      _retry: true,
    };

    return fetchWithTimeout(url + endpoint, retryOptions);
  }

  return response;
}

const prepareRequest = (
  method: string,
  data?: any,
  options: ApiFetchOptions = {},
): RetryableRequestInit => {
  const isFormData = data instanceof FormData;

  return {
    ...options,
    method,
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    headers: options.headers || {},
  };
};

export const apiFetch = {
  get: (endpoint: string, options?: ApiFetchOptions) =>
    fetchWithAuth(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, data?: any, options?: ApiFetchOptions) => {
    const init = prepareRequest('POST', data, options);
    return fetchWithAuth(endpoint, init);
  },

  put: (endpoint: string, data?: any, options?: ApiFetchOptions) => {
    const init = prepareRequest('PUT', data, options);
    return fetchWithAuth(endpoint, init);
  },

  delete: (endpoint: string, options?: ApiFetchOptions) =>
    fetchWithAuth(endpoint, { ...options, method: 'DELETE' }),
};
