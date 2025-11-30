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
    if (!res.ok) {
      let errorBody = null;
      try {
        const text = await res.text();
        errorBody = text ? JSON.parse(text) : null;
      } catch {
        console.error(`Get my profile failed: ${res.status}`, errorBody || '');
        return null;
      }
    }
    const text = await res.text();
    if (!text) return null;
    const profile: userProfile = JSON.parse(text);
    console.log(profile);
    return profile ?? null;
  } catch (error) {
    console.error('Network error : ' + error);
    return null;
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

    const res = await apiFetch.put('/api/users', formData);
    if (!res.ok) {
      const err = await res.text();
      if (res.status === 401) await logout();
      console.error('Cập nhật profile thất bại:', res.status, err);
      return null;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
