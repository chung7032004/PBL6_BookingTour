import { apiFetch } from './fetch';

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const endpoint = '/api/auth/password/change';

    const request: ChangePasswordRequest = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const res = await apiFetch.put(endpoint, request);
    const data = await res.json(); // backend LUÔN trả JSON

    console.log(res.status, data);

    if (!res.ok) {
      return {
        success: false,
        message: extractErrorMessage(data),
      };
    }

    return {
      success: true,
      message: data?.Message ?? 'Password changed successfully',
    };
  } catch (error) {
    console.log('Reset Password API Error:', error);
    return {
      success: false,
      message: 'Unable to connect to the server.',
    };
  }
}

function extractErrorMessage(data: any): string {
  if (data?.Errors) {
    const firstKey = Object.keys(data.Errors)[0];
    if (firstKey && data.Errors[firstKey]?.length > 0) {
      return data.Errors[firstKey][0];
    }
  }

  if (data?.Message) {
    return data.Message;
  }

  return 'An unexpected error occurred';
}
