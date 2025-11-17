import { Experience, ExperiencesResponse } from '../../../types/experience';
import { fetchWithTimeout } from '../auth/login';
import { url } from '../url';

export async function getExperiences(
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  experiences: Experience[];
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
