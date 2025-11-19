import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../url';

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

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string | null }> {
  try {
    const res = await fetchWithTimeout(
      url + '/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
      5000,
    );

    const data = await res.json();
    console.log('Login response:', data);

    // Đăng nhập thành công nếu API trả về accessToken
    if (res.ok && data?.accessToken) {
      // Lưu token
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('email', email);

      return {
        success: true,
        message: null,
      };
    }

    return {
      success: false,
      message: data?.Message,
    };
  } catch (error) {
    console.log('Login API Error:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}

export async function checkLogin(): Promise<boolean> {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token != null;
  } catch (error) {
    console.log('Check Login API Error:', error);
    return false;
  }
}
export async function logout() {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('email');
  } catch (error) {
    console.log('Logout API Error:', error);
  }
}
