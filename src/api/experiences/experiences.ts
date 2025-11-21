import {
  Experience,
  ExperiencesResponse,
  TourCardProps,
} from '../../../types/experience';
import { fetchWithTimeout } from '../auth/login';
import { url } from '../url';

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
    return `${h}h${roundedM}'`;
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
        return { experience: null, message: 'Không tìm thấy trải nghiệm' };
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const data: Experience = await res.json();
    return {
      experience: data,
      message: null,
    };
  } catch (error) {
    console.log('getExperience API Error:', error);
    return {
      experience: null,
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}
