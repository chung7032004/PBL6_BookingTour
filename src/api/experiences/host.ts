import { HostDetail, HostInTour, userProfile } from '../../../types/host';
import { apiFetch, fetchWithAuth, fetchWithTimeout } from '../auth/fetch';
import { logout } from '../auth/login';
import { url } from '../url';

export async function getHostDetail(
  hostId: string,
): Promise<{ host: HostDetail | null }> {
  try {
    const fullUrl = `${url}/api/hosts/${hostId}`;
    const res = await fetchWithTimeout(
      fullUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      7000,
    );
    if (!res.ok) {
      if (res.status === 404) {
        return { host: null };
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const data: HostDetail = await res.json();
    return {
      host: data,
    };
  } catch (error) {
    console.log(error);
    return {
      host: null,
    };
  }
}

export function toHostInTour(host: HostDetail): HostInTour {
  return {
    id: host.id,
    fullName: host.fullName,
    avatarUrl: host.avatarUrl,
    bio: host.bio,
  };
}

export async function getMyProfile(): Promise<userProfile | null> {
  const endpoint = '/api/users/me';
  try {
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return null;
    }
    if (!res.ok) {
      let message = 'The attempt to retrieve the record information failed.';
      try {
        const text = await res.text();
        if (text) {
          const errorJson = JSON.parse(text);
          message = errorJson.message || errorJson.error || message;
        }
      } catch {
        // ignore parse error
      }
      throw new Error(`${message} (${res.status})`);
    }
    const text = await res.text();
    if (!text) return null;
    const profile: userProfile = JSON.parse(text);
    return profile;
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      throw new Error('Unable to connect to the server.');
    }
    throw error;
  }
}

export async function updateMyProfile(data: {
  FullName?: string;
  PhoneNumber?: string;
  DateOfBirth?: string;
  Gender?: 'Male' | 'Female' | 'Other';
  Country?: string;
  Avatar?: any;
}): Promise<userProfile | null> {
  try {
    const formData = new FormData();
    if (data.FullName !== undefined) formData.append('FullName', data.FullName);
    if (data.PhoneNumber !== undefined)
      formData.append('PhoneNumber', data.PhoneNumber);
    if (data.DateOfBirth !== undefined)
      formData.append('DateOfBirth', data.DateOfBirth);
    if (data.Gender !== undefined) formData.append('Gender', data.Gender);
    if (data.Country !== undefined) formData.append('Country', data.Country);
    if (data.Avatar === null) formData.append('Avatar', '');
    if (data.Avatar) formData.append('Avatar', data.Avatar as any);

    console.log('Updating profile with data:', formData);
    const res = await apiFetch.put('/api/users', formData);
    if (!res.ok) {
      const err = await res.text();
      if (res.status === 401) await logout();
      console.log('Cập nhật profile thất bại:', res.status, err);
      return null;
    }

    const text = await res.text();
    console.log('Cập nhật profile thành công:', text);
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.log('Lỗi', error);
    return null;
  }
}
