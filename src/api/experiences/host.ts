import { HostDetail, HostInTour } from '../../../types/host';
import { fetchWithTimeout } from '../auth/login';
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
