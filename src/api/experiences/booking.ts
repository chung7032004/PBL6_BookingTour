import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateBookingRequest,
  CreateBookingResponse,
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
      let message = 'Tạo đặt chỗ thất bại';
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
      throw new Error('Không có kết nối mạng');
    }
    throw error;
  }
}

export async function cancelBooking(
  reason: string,
  bookingId: string,
): Promise<boolean> {
  const endpoint = `/api/bookings/${bookingId}/cancel`;
  try {
    const res = await apiFetch.post(endpoint, {
      reason,
      isCancelledByHost: false,
    });
    if (!res.ok) {
      let message = 'Hủy booking thất bại';
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
    if (!text) return false;
    const response = JSON.parse(text); // chưa dùng đến
    return true;
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      throw new Error('Không có kết nối mạng');
    }
    throw error;
  }
}

export async function getMyBooking(userId: string): Promise<any[] | null> {
  const endpoint = `/api/bookings/user/${userId}`;
  try {
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return null;
    }
    if (!res.ok) {
      let message = 'Lấy danh sách booking thất bại';
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
    const bookings = JSON.parse(text);
    return bookings;
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      throw new Error('Không có kết nối mạng');
    }
    throw error;
  }
}

export async function getBookingById(booking: string): Promise<any | null> {
  const endpoint = `/api/bookings/${booking}`;
  try {
    const res = await apiFetch.get(endpoint);
    if (res.status === 401) {
      return null;
    }
    if (!res.ok) {
      let message = 'Lấy thông tin booking thất bại';
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
    const bookingData = JSON.parse(text);
    return bookingData;
  } catch (error: any) {
    if (
      error.name === 'TypeError' ||
      error.message.includes('fetch') ||
      error.message === 'REQUEST_TIMEOUT'
    ) {
      throw new Error('Không có kết nối mạng');
    }
    throw error;
  }
}
