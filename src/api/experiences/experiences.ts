import {
  Category,
  Experience,
  ExperiencesResponse,
  Slot,
  TourCardProps,
} from '../../../types/experience';
import { HostDetail, HostInTour } from '../../../types/host';
import { fetchWithTimeout } from '../auth/fetch';
import { url } from '../url';
import { getHostDetail, toHostInTour } from './host';

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0'";

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) {
    const rounded = Math.round(m / 15) * 15;
    if (rounded === 60) return '1h';
    return `${rounded}'`;
  }

  if (m === 0) {
    return `${h}h`;
  } else {
    const roundedM = Math.round(m / 15) * 15;
    if (roundedM === 0) return `${h}h`;
    if (roundedM === 60) return `${h + 1}h`;
    return `${h} hours${roundedM}'`;
  }
}

export async function getCategories(): Promise<Category[] | null> {
  try {
    const fullUrl = `${url}/api/categories`;
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
      console.log('Có lỗi xảy ra:' + res.status);
      return null;
    }
    const categories: Category[] = await res.json();
    return categories;
  } catch (error) {
    console.log('Network Error: ' + error);
    return null;
  }
}
export async function getExperiences(
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  experiences: TourCardProps[];
  totalCount?: number;
  messages: string | null;
}> {
  const param = {
    sortBy: 'createdAt',
    isAscending: false,
  };
  try {
    const fullUrl = `${url}/api/experiences?pageNumber=${page}&pageSize=${pageSize}&sortBy=${param.sortBy}&isAscending=${param.isAscending}`;
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
      throw Error('Network error');
    }
    const data = await res.json();
    const apiResponse = data as ExperiencesResponse;
    return {
      experiences: apiResponse.data,
      totalCount: apiResponse.totalCount,
      messages: null,
    };
  } catch (error) {
    console.log('getExperience API Error:', error);
    return {
      experiences: [],
      messages: 'Không thể kết nối đến máy chủ',
    };
  }
}

export async function getExperiencesById(experienceId: string): Promise<{
  experience: Experience | null;
  host: HostDetail | null;
  message: string | null;
}> {
  try {
    const fullUrl = `${url}/api/experiences/${experienceId}`;
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
        return {
          experience: null,
          host: null,
          message: 'Không tìm thấy trải nghiệm',
        };
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const data: Experience = await res.json();
    const { host } = await getHostDetail(data.hostId);
    // const hostInTour = host ? toHostInTour(host) : null;
    console.log(host);
    return {
      experience: data,
      host: host,
      message: null,
    };
  } catch (error) {
    console.log('getExperience API Error:', error);
    return {
      experience: null,
      host: null,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}
export async function getExperienceAvailability(
  experienceId: string,
  startDate: string,
  endDate: string,
): Promise<Slot[] | null> {
  try {
    const fullUrl = `${url}/api/experiences/${experienceId}/availability?startDate=${startDate}&endDate=${endDate}`;
    const res = await fetchWithTimeout(
      fullUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      3000,
    );
    if (!res.ok) {
      console.log('Có lỗi xảy ra:' + res.status);
      return null;
    }
    const slots: Slot[] = await res.json();
    return slots;
  } catch (error) {
    console.log('Network Error: ' + error);
    return null;
  }
}
