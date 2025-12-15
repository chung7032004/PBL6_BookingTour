import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../url';
import { jwtDecode } from 'jwt-decode';
import { apiFetch, fetchWithTimeout } from './fetch';
interface JwtPayload {
  role: string;
  email: string;
  exp: number; // thời gian hết hạn của token
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
      let decoded: JwtPayload;
      try {
        decoded = jwtDecode<JwtPayload>(data.accessToken);
      } catch (err) {
        console.log('Decode token lỗi: ', err);
        return {
          success: false,
          message: 'Token không hợp lệ',
        };
      }
      // Chỉ cho phép User đăng nhập
      if (decoded.role !== 'User') {
        return {
          success: false,
          message: 'Tài khoảng không được phép đăng nhập vào ứng dựng',
        };
      }
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
      message: data?.Message || 'Đăng nhập thất bại',
    };
  } catch (error: any) {
    console.log('Login API Error:', error);
    return {
      success: false,
      message:
        error.message === 'timeout'
          ? 'Không thể kết nối đến máy chủ(timeout)'
          : 'Không thể kết nối đến máy chủ',
    };
  }
}

export async function checkLoginAndRole(): Promise<{
  isLoggedIn: boolean;
  isUserRole: boolean;
}> {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) return { isLoggedIn: false, isUserRole: false };
    const decoded: JwtPayload = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      await logout();
      return { isLoggedIn: false, isUserRole: false };
    }
    return { isLoggedIn: true, isUserRole: true };
  } catch (error) {
    console.log('Token error and Role error');
    return { isLoggedIn: false, isUserRole: false };
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
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) return false;
  try {
    const endpoint = '/api/auth/logout';
    const res = await apiFetch.post(endpoint, { refreshToken });
    if (res.ok) {
      console.log('Đăng xuất thành công trên server');
      return true;
    } else {
      const errorData = await res.text();
      console.log('Lỗi server khi đăng xuất.', res.status, 'Body:', errorData);
      return false;
    }
  } catch (error) {
    console.log('Logout API Error:', error);
    return false;
  } finally {
    // Luôn xóa token cục bộ dù API có thành công hay không
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('email');
  }
}
