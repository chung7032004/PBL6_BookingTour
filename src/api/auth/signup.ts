import { url } from '../url';
import { fetchWithTimeout } from './fetch';

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
      let errorMsg = data?.Message || 'Sign up failed';

      if (data?.Message !== null && data?.Errors) {
        const error = Object.values(data.Errors).flat().join('\n');
        errorMsg = error || errorMsg;
      }
      return {
        accountId: null,
        message: errorMsg,
      };
    }
  } catch (error) {
    console.log('Signup API Error:', error);
    return {
      accountId: null,
      message: 'Unable to connect to the server.',
    };
  }
}
