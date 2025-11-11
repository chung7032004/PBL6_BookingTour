import { url } from '../url';
import { fetchWithTimeout } from './login';

export async function signup(
  email: string,
  password: string,
  name: string,
): Promise<{ accountId: string | null; message: string | null }> {
  try {
    const res = await fetchWithTimeout(
      url + '/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          fullName: name,
          password: password,
          passwordConfirm: password,
        }),
      },
      5000,
    );

    const data = await res.json();
    console.log('Signup response:', data);

    if (res.ok && data?.accountId) {
      return {
        accountId: data.accountId,
        message: null,
      };
    } else {
      return {
        accountId: null,
        message: data?.Message || 'Đăng ký thất bại',
      };
    }
  } catch (error) {
    console.log('Signup API Error:', error);
    return {
      accountId: null,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}
