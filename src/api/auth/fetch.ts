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

async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('No refresh token found');
      return null;
    }

    const res = await fetch(url + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: { refreshToken },
      }),
    });

    if (!res.ok) {
      console.log('Refresh token failed with status:', res.status);
      return null;
    }

    const text = await res.text();
    if (!text) {
      console.log('Refresh response empty');
      return null;
    }

    const data = JSON.parse(text);
    if (data?.accessToken) {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    }

    return null;
  } catch (e: any) {
    console.log('Refresh token exception:', e.message || e);
    return null;
  }
}
// export async function fetchWithAuth(
// endpoint: string,
// options: RetryableRequestInit = {},
// ): Promise<Response> {
// Sử dụng cờ để kiểm tra xem request này có phải là lần retry hay không
// const _retry = (options as any)._retry || false;
// let accessToken = await AsyncStorage.getItem('accessToken');
// let finalOptions: RequestInit = { ...options }; // 1. Thêm Access Token vào Header
//
// if (accessToken) {
// finalOptions.headers = {
// ...(options.headers || {}),
// Authorization: `Bearer ${accessToken}`,
// 'Content-Type': 'application/json', // Thêm Content-Type mặc định
// };
// } else {
// Nếu không có token, vẫn set Content-Type và gửi request
// finalOptions.headers = {
// ...(options.headers || {}),
// 'Content-Type': 'application/json',
// };
// }
//
// let res = await fetch(url + endpoint, finalOptions); // 2. Xử lý lỗi 401 (Unauthorized - Token hết hạn)
//
// if (res.status === 401 && !_retry) {
// console.log('Access token expired → refreshing...');
//
// const newToken = await refreshToken();
//
// if (!newToken) {
// console.log('Refresh Token failed or not found');
// await logout();
// return res;
// } // Tái gửi request với Token mới
//
// console.log('Token refreshed. Retrying original request...'); // Cập nhật token mới và thêm cờ _retry
// const retryOptions: RetryableRequestInit = {
// ...options,
// headers: {
// ...(options.headers || {}),
// Authorization: `Bearer ${newToken}`,
// 'Content-Type': 'application/json',
// },
// _retry: true,
// }; // Thực hiện lại fetch với token mới và tùy chọn ban đầu
//
// return fetch(url + endpoint, retryOptions);
// }
//
// return res;
// }
// export const apiFetch = {
// get: (endpoint: string, options: ApiFetchOptions = {}) => {
// return fetchWithAuth(endpoint, { ...prepareBody(options), method: 'GET' });
// },

// post: (endpoint: string, data?: any, options: ApiFetchOptions = {}) => {
// return fetchWithAuth(endpoint, {
// ...prepareBody({ ...options, body: data }),
// method: 'POST',
// });
// },

// put: (endpoint: string, data: any, options: ApiFetchOptions = {}) => {
// return fetchWithAuth(endpoint, {
// ...prepareBody({ ...options, body: data }),
// method: 'PUT',
// });
// },

// delete: (endpoint: string, options: ApiFetchOptions = {}) => {
// return fetchWithAuth(endpoint, {
// ...prepareBody(options),
// method: 'DELETE',
// });
// },
// };
// Hàm chuyển đổi body thành chuỗi JSON
// const prepareBody = (options: ApiFetchOptions): RetryableRequestInit => {
// const finalOptions = { ...options };
//
// if (finalOptions.body && typeof finalOptions.body !== 'string') {
// finalOptions.body = JSON.stringify(finalOptions.body);
// }
//
// return finalOptions as RetryableRequestInit;
// };
//

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
// const prepareRequest = (
// method: string,
// data?: any,
// options: ApiFetchOptions = {},
// ): [string, RetryableRequestInit] => {
// const isFormData = data instanceof FormData;
// const body = isFormData ? data : data ? JSON.stringify(data) : undefined;
//
// return [
// '',
// {
// ...options,
// method,
// body,
// headers: options.headers || {},
// } as RetryableRequestInit,
// ];
// };

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
//
// export const apiFetch = {
// get: (endpoint: string, options?: ApiFetchOptions) =>
// fetchWithAuth(endpoint, { ...options, method: 'GET' }),
//
// post: (endpoint: string, data?: any, options?: ApiFetchOptions) => {
// const [, init] = prepareRequest('POST', data, options);
// return fetchWithAuth(endpoint, init);
// },
// put: (endpoint: string, data?: any, options?: ApiFetchOptions) => {
// const [, init] = prepareRequest('PUT', data, options);
// return fetchWithAuth(endpoint, init);
// },
//
// delete: (endpoint: string, options?: ApiFetchOptions) =>
// fetchWithAuth(endpoint, { ...options, method: 'DELETE' }),
// };

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
