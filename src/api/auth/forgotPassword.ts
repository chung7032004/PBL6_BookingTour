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
