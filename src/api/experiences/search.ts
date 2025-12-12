import { ExperiencesResponse, TourCardProps } from '../../../types/experience';
import { fetchWithTimeout } from '../auth/fetch';
import { url } from '../url';

export async function search(
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
  categoryIds: string[] = [],
): Promise<{
  experiences: TourCardProps[];
  totalCount?: number;
  message: string | null;
}> {
  try {
    let fullUrl = '';
    if (categoryIds.length > 0) {
      const categoryQuery = categoryIds
        .map(id => `&CategoryIds=${id}`)
        .join('');
      fullUrl =
        `${url}/api/experiences?searchTerm=${keyword}&minDuration=&maxDuration=&pageNumber=${page}&pageSize=${pageSize}` +
        categoryQuery;
    } else {
      fullUrl = `${url}/api/experiences?searchTerm=${keyword}&minDuration=&maxDuration=&pageNumber=${page}&pageSize=${pageSize}`;
    }
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
      throw 'Network error';
    }
    const data = await res.json();
    const apiResponse = data as ExperiencesResponse;
    console.log(apiResponse);
    return {
      experiences: apiResponse.data,
      totalCount: apiResponse.totalCount,
      message: null,
    };
  } catch (error) {
    console.log('API Search error' + error);
    return {
      experiences: [],
      message: 'Không thể kết nối đến máy chủ',
    };
  }
}
