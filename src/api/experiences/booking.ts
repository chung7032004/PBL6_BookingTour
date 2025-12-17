import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BookingDetail,
  BookingResponse,
  CancelBooking,
  CreateBookingRequest,
  CreateBookingResponse,
  CreateReviewRequest,
  Review,
} from '../../../types/booking';
import { apiFetch } from '../auth/fetch';

export async function createBooking(
  request: CreateBookingRequest,
): Promise<CreateBookingResponse | null> {
  const endpoint = '/api/bookings';
  console.log('createBooking request', request);
  console.log('AccessToken', AsyncStorage.getItem('accessToken'));
  try {
    const res = await apiFetch.post(endpoint, request);
    if (res.status === 401) {
      return null;
    }
    if (!res.ok) {
      let message = 'Failed to create booking';
      try {
        const text = await res.text();
        if (text) {
          const errorJson = JSON.parse(text);
          message = errorJson.message || errorJson.error || message;
          console.log('createBooking error response', errorJson);
        }
      } catch {
        // ignore parse error
      }
      throw new Error(`${message} (${res.status})`);
    }
    const text = await res.text();
    if (!text) return null;
    const response: CreateBookingResponse = JSON.parse(text);
    console.log('createBooking response', response);
    return response;
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

export async function cancelBooking(
  reason: string,
  bookingId: string,
): Promise<{
  success: boolean;
  message: string;
  errorType?: 'NOT_LOGGED_IN' | 'FETCH_FAILED';
}> {
  const endpoint = `/api/bookings/${bookingId}/cancel`;
  const cancel: CancelBooking = {
    reason: reason,
    isCancelledByHost: false,
  };
  try {
    const res = await apiFetch.post(endpoint, cancel);
    console.log(res);
    if (res.status === 401) {
      return {
        success: false,
        message: 'You are not logged in or your session has expired.',
        errorType: 'NOT_LOGGED_IN',
      };
    }
    if (!res.ok) {
      let message = 'Failed to cancel booking';
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
        success: false,
        message: `${message}(${res.status})`,
        errorType: 'FETCH_FAILED',
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        success: false,
        message: 'The response data is empty.',
        errorType: 'FETCH_FAILED',
      };
    }
    const response = JSON.parse(text); // chưa dùng đến
    return {
      success: response.success,
      message: response.message,
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        success: false,
        message: 'No network connection. Please check your connection.',
        errorType: 'FETCH_FAILED',
      };
    }
    return {
      success: false,
      message: 'An unknown error occurred. Please try again.',
      errorType: 'FETCH_FAILED',
    };
  }
}

export async function getMyBooking(): Promise<{
  bookingResponse: BookingResponse;
  message: string;
  errorType?: 'NOT_LOGGED_IN' | 'FETCH_FAILED';
}> {
  const endpoint = `/api/bookings`;
  const responseFailed = {
    data: [],
    success: false,
  };
  try {
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return {
        bookingResponse: responseFailed,
        message: 'You are not logged in or your session has expired.',
        errorType: 'NOT_LOGGED_IN',
      };
    }
    if (!res.ok) {
      let message = 'Failed to fetch booking information';
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
        bookingResponse: responseFailed,
        message: `${message}(${res.status}).`,
        errorType: 'FETCH_FAILED',
      };
    }
    const text = await res.text();
    if (!text)
      return {
        bookingResponse: responseFailed,
        message: 'The response data is empty.',
        errorType: 'FETCH_FAILED',
      };
    const bookings = JSON.parse(text);
    console.log(bookings);
    return {
      bookingResponse: {
        data: bookings.data,
        success: true,
      },
      message: "Booking information successfully retrieved',",
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        bookingResponse: responseFailed,
        message: 'No network connection. Please check your connection.',
        errorType: 'FETCH_FAILED',
      };
    }
    return {
      bookingResponse: responseFailed,
      message: error.message || 'An unknown error occurred. Please try again',
      errorType: 'FETCH_FAILED',
    };
  }
}

export async function getBookingById(bookingId: string): Promise<{
  bookingDetail: BookingDetail | null;
  message: string;
  errorType?: 'NOT_LOGGED_IN' | 'FETCH_FAILED';
}> {
  const endpoint = `/api/bookings/${bookingId}`;
  try {
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return {
        bookingDetail: null,
        message: 'You are not logged in or your session has expired ',
        errorType: 'NOT_LOGGED_IN',
      };
    }
    if (!res.ok) {
      let message = 'Failed to fetch booking detail';
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
        bookingDetail: null,
        message: `${message}(${res.status})`,
        errorType: 'FETCH_FAILED',
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        bookingDetail: null,
        message: 'The response data is empty  ',
        errorType: 'FETCH_FAILED',
      };
    }
    const bookingData = JSON.parse(text);
    console.log(bookingData);
    return {
      bookingDetail: bookingData,
      message: 'Booking detail successfully retrieved',
    };
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      return {
        bookingDetail: null,
        message: 'No network connection. Please check your connection',
        errorType: 'FETCH_FAILED',
      };
    }
    return {
      bookingDetail: null,
      message: error.message || 'An unknown error occurred. Please try again ',
      errorType: 'FETCH_FAILED',
    };
  }
}

export async function createReview(request: CreateReviewRequest): Promise<{
  reviewResponse: Review | null;
  message: string;
  errorType?: 'NOT_LOGGED_IN' | 'FETCH_FAILED';
}> {
  const endpoint = `/api/experiences/${request.experienceId}/reviews`;
  try {
    const res = await apiFetch.post(endpoint, {
      rating: request.rating,
      description: request.description,
    });
    if (res.status === 401) {
      return {
        reviewResponse: null,
        message: 'You are not logged in or your session has expired ',
        errorType: 'NOT_LOGGED_IN',
      };
    }
    if (!res.ok) {
      let message = 'Failed to fetch create review';
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
        errorType: 'FETCH_FAILED',
      };
    }
    const text = await res.text();
    if (!text) {
      return {
        reviewResponse: null,
        message: 'The response data is empty  ',
        errorType: 'FETCH_FAILED',
      };
    }
    const review = JSON.parse(text);
    console.log(review);
    return {
      reviewResponse: review,
      message: 'Create review successfully',
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
        errorType: 'FETCH_FAILED',
      };
    }
    return {
      reviewResponse: null,
      message: error.message || 'An unknown error occurred. Please try again ',
      errorType: 'FETCH_FAILED',
    };
  }
}
