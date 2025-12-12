import { url } from '../url';
import { fetchWithTimeout } from './fetch';

export async function forgotPassword(
  email: string,
): Promise<{ success: boolean; message: string | null }> {
  try {
    const res = await fetchWithTimeout(
      url + '/api/auth/password/forgot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      },
      5000,
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: data.success || true,
        message: data.message || 'Mã đã được gửi đến Email.',
      };
    } else {
      let errorMessage = 'Email không hợp lệ, vui lòng thử lại,';
      if (data && data?.Message) {
        errorMessage = data.Message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    console.log('Forgot Password API Error:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}

export async function resetPassword(
  email: string,
  token: string,
  password: string,
): Promise<{ success: boolean; message: string | null }> {
  try {
    const res = await fetchWithTimeout(
      url + '/api/auth/password/reset',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token: token,
          Password: password,
          confirmPassword: password,
        }),
      },
      10000,
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: data.success || true,
        message: data.message || 'Cập nhật mật khẩu thành công',
      };
    } else {
      let errorMessage = 'Mã code không hợp lệ.';
      if (data && data?.Message) {
        errorMessage = data.Message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    console.log('Reset Password API Error:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): Promise<{ success: boolean; message: string | null }> {
  try {
    const res = await fetchWithTimeout(
      url + '/api/auth/password/reset',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      },
      10000,
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: data.success || true,
        message: data.message || 'Cập nhật mật khẩu thành công',
      };
    } else {
      let errorMessage = 'Mã code không hợp lệ.';
      if (data && data?.Message) {
        errorMessage = data.Message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    console.log('Reset Password API Error:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}
