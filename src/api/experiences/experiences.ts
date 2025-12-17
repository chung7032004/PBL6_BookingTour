import { ReviewResponse } from '../../../types/booking';
import {
  Category,
  Experience,
  ExperiencesPopular,
  ExperiencesRecommendation,
  ExperiencesResponse,
  Slot,
  TourCardProps,
} from '../../../types/experience';
import { HostDetail } from '../../../types/host';
import { apiFetch, fetchWithTimeout } from '../auth/fetch';
import { url } from '../url';
import { getHostDetail, toHostInTour } from './host';

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0'";

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) {
    const rounded = Math.round(m / 15) * 15;
    if (rounded === 60) return '1 hours';
    return `${rounded}'`;
  }

  if (m === 0) {
    return `${h} hours`;
  } else {
    const roundedM = Math.round(m / 15) * 15;
    if (roundedM === 0) return `${h} hours`;
    if (roundedM === 60) return `${h + 1} hours`;
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
  pageNumber?: number;
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
    console.log('experience', data);
    const apiResponse = data as ExperiencesResponse;
    return {
      experiences: apiResponse.data,
      totalCount: apiResponse.totalCount,
      pageNumber: apiResponse.pageNumber,
      messages: null,
    };
  } catch (error) {
    console.log('getExperience API Error:', error);
    return {
      experiences: [],
      messages: 'Unable to connect to the server.',
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
          message: 'Not found experience',
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
      message: 'Unable to connect to the server.',
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
export async function getReviews(
  experienceId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  reviewResponse: ReviewResponse | null;
  message: string;
}> {
  try {
    const endpoint = `${url}/api/experiences/${experienceId}/reviews?pageNumber=${page}&pageSize=${pageSize}`;
    const res = await fetchWithTimeout(
      endpoint,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      7000,
    );

    if (!res.ok) {
      let message = 'Failed to fetch reviews';
      try {
        const text = await res.text();
        if (text) {
          const errorJson = JSON.parse(text);
          message = errorJson.message || errorJson.error || message;
        }
      } catch {
        // ignore parse error
      }
      return {
        reviewResponse: null,
        message: `${message}(${res.status})`,
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        reviewResponse: null,
        message: 'The response data is empty  ',
      };
    }
    const reviews = JSON.parse(text);
    console.log(reviews);
    return {
      reviewResponse: reviews,
      message: 'Get reviews successfully retrieved',
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        reviewResponse: null,
        message: 'No network connection. Please check your connection',
      };
    }
    return {
      reviewResponse: null,
      message: error.message || 'An unknown error occurred. Please try again ',
    };
  }
}

export async function getRecommendations(): Promise<{
  experience: ExperiencesRecommendation | null;
  message: string;
  errorType?: 'NOT_LOGGED_IN' | 'FETCH_FAILED';
}> {
  try {
    const endpoint = '/api/experiences/recommendations?topK=10';
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return {
        experience: null,
        message: 'You are not logged in or your session has expired ',
        errorType: 'NOT_LOGGED_IN',
      };
    }
    if (!res.ok) {
      let message = 'Failed to fetch get recommendations';
      try {
        const text = await res.text();
        if (text) {
          const errorJson = JSON.parse(text);
          message = errorJson.message || errorJson.error || message;
        }
      } catch {
        // ignore parse error
      }
      return {
        experience: null,
        message: `${message}(${res.status})`,
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        experience: null,
        message: 'The response data is empty  ',
      };
    }
    const experiencesRecommendation = JSON.parse(text);
    console.log(experiencesRecommendation);
    return {
      experience: experiencesRecommendation,
      message: 'Get recommendations successfully retrieved',
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        experience: null,
        message: 'No network connection. Please check your connection',
      };
    }
    return {
      experience: null,
      message: error.message || 'An unknown error occurred. Please try again ',
    };
  }
}

export async function getPopular(): Promise<{
  experience: ExperiencesPopular | null;
  message: string;
}> {
  try {
    const endpoint = `${url}/api/experiences/popular?topK=10`;
    const res = await fetchWithTimeout(
      endpoint,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      7000,
    );
    console.log('popular', res);
    if (!res.ok) {
      let message = 'Failed to fetch get recommendations';
      try {
        const text = await res.text();
        if (text) {
          const errorJson = JSON.parse(text);
          message = errorJson.message || errorJson.error || message;
        }
      } catch {
        // ignore parse error
      }
      return {
        experience: null,
        message: `${message}(${res.status})`,
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        experience: null,
        message: 'The response data is empty  ',
      };
    }
    const experiencesPopular = JSON.parse(text);
    console.log(experiencesPopular);
    return {
      experience: experiencesPopular,
      message: 'Get recommendations successfully retrieved',
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        experience: null,
        message: 'No network connection. Please check your connection',
      };
    }
    return {
      experience: null,
      message: error.message || 'An unknown error occurred. Please try again ',
    };
  }
}
