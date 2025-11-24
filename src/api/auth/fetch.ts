import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../url';

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
        command: { refreshToken }, // <<< Đừng quên cái này nếu backend dùng MediatR
      }),
    });

    // THÊM ĐIỀU KIỆN NÀY ĐỂ TRÁNH LỖI JSON PARSE
    if (!res.ok) {
      console.log('Refresh token failed with status:', res.status);
      return null;
    }

    // Chỉ parse JSON khi có nội dung
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
export async function fetchWithAuth(
  endpoint: string,
  options: RetryableRequestInit = {},
): Promise<Response> {
  // Sử dụng cờ để kiểm tra xem request này có phải là lần retry hay không
  const _retry = (options as any)._retry || false;
  let accessToken = await AsyncStorage.getItem('accessToken');
  let finalOptions: RequestInit = { ...options }; // 1. Thêm Access Token vào Header

  if (accessToken) {
    finalOptions.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', // Thêm Content-Type mặc định
    };
  } else {
    // Nếu không có token, vẫn set Content-Type và gửi request
    finalOptions.headers = {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    };
  }

  let res = await fetch(url + endpoint, finalOptions); // 2. Xử lý lỗi 401 (Unauthorized - Token hết hạn)

  if (res.status === 401 && !_retry) {
    console.log('Access token expired → refreshing...');

    const newToken = await refreshToken();

    if (!newToken) {
      console.log('Refresh Token failed or not found');
      // await logout();
      return res;
    } // Tái gửi request với Token mới

    console.log('Token refreshed. Retrying original request...'); // Cập nhật token mới và thêm cờ _retry
    const retryOptions: RetryableRequestInit = {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      },
      _retry: true,
    }; // Thực hiện lại fetch với token mới và tùy chọn ban đầu

    return fetch(url + endpoint, retryOptions);
  }

  return res;
}

// Hàm chuyển đổi body thành chuỗi JSON
const prepareBody = (options: ApiFetchOptions): RetryableRequestInit => {
  const finalOptions = { ...options };

  if (finalOptions.body && typeof finalOptions.body !== 'string') {
    finalOptions.body = JSON.stringify(finalOptions.body);
  }

  return finalOptions as RetryableRequestInit;
};

// Định nghĩa các phương thức API
export const apiFetch = {
  get: (endpoint: string, options: ApiFetchOptions = {}) => {
    return fetchWithAuth(endpoint, { ...prepareBody(options), method: 'GET' });
  },

  post: (endpoint: string, data?: any, options: ApiFetchOptions = {}) => {
    return fetchWithAuth(endpoint, {
      ...prepareBody({ ...options, body: data }),
      method: 'POST',
    });
  },

  put: (endpoint: string, data: any, options: ApiFetchOptions = {}) => {
    return fetchWithAuth(endpoint, {
      ...prepareBody({ ...options, body: data }),
      method: 'PUT',
    });
  },

  delete: (endpoint: string, options: ApiFetchOptions = {}) => {
    return fetchWithAuth(endpoint, {
      ...prepareBody(options),
      method: 'DELETE',
    });
  },
};
