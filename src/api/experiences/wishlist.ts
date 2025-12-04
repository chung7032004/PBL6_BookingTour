import { apiFetch } from '../auth/fetch';
import {
  AddExperienceToWishListResponse,
  DeleteWishlistResponse,
  MyWishListResponse,
  RemoveExperienceFromWishListResponse,
  WishListDetailResponse,
  WishlistResponse,
} from '../../../types/wishlist';

async function safeJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    console.log('JSON parse failed:', text);
    return null;
  }
}
export async function createWishList(name: string): Promise<WishlistResponse> {
  try {
    const res = await apiFetch.post('/api/wishlists', { name: name.trim() });

    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Create wishlist failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        id: '',
        isSuccess: false,
        message: 'Your session has expired. Please log in again.',
      };
    }

    const data = await safeJson<WishlistResponse>(res);
    if (!data || !data.isSuccess) {
      console.log('Wishlist creation failed:', data?.message || data);
      return {
        id: '',
        isSuccess: false,
        message: data?.message || 'Wishlist creation failed',
      };
    }

    console.log('Wishlist created:', data);
    return data;
  } catch (e: any) {
    console.log('Create WishList network error:', e.message || e);
    return {
      id: '',
      isSuccess: false,
      message: 'Network error',
    };
  }
}

export async function deleteWishList(
  wishListId: string,
): Promise<DeleteWishlistResponse> {
  try {
    const res = await apiFetch.delete(`/api/wishlists/${wishListId}`);
    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Delete wishlist failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        isSuccess: false,
        message: 'Your session has expired. Please log in again.',
      };
    }
    const data = await safeJson<DeleteWishlistResponse>(res);
    if (!data || !data.isSuccess) {
      console.log('Wishlist deleted failed:', data?.message || data);
      return {
        isSuccess: false,
        message: data?.message || 'Wishlist deleted failed!',
      };
    }
    return data;
  } catch (e: any) {
    console.log('Delete WishList network error:', e.message || e);
    return {
      isSuccess: false,
      message: 'Network error',
    };
  }
}

export async function getMyWishLists(): Promise<{
  myWishList: MyWishListResponse[] | null;
  message: string | null;
}> {
  try {
    const res = await apiFetch.get('/api/wishlists');
    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Get my wishlists failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        myWishList: null,
        message: 'Your session has expired. Please log in again.',
      };
    }
    const data = await safeJson<MyWishListResponse[]>(res);
    if (!data) {
      console.log('Get my wishlist failed:', data);
      return {
        myWishList: null,
        message: 'Get my wishlist failed.',
      };
    }
    return {
      myWishList: data,
      message: null,
    };
  } catch (e: any) {
    console.log('Create WishList network error:', e.message || e);
    return {
      myWishList: null,
      message: 'Network error',
    };
  }
}

export async function getWishListDetail(wishListId: string): Promise<{
  wishListDetail: WishListDetailResponse | null;
  message: string | null;
}> {
  try {
    const res = await apiFetch.get(`/api/wishlists/${wishListId}`);
    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Get wishlists detail failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        wishListDetail: null,
        message: res.status.toString(),
      };
    }
    const data = await safeJson<WishListDetailResponse>(res);
    if (!data || !data?.id) {
      console.log(
        'Get wishlist detail, but API reported failure or invalid response:',
        data,
      );
      return {
        wishListDetail: null,
        message:
          'Get wishlist detail, but API reported failure or invalid response:' +
          data,
      };
    }
    console.log('Wishlist created:', data);
    return {
      wishListDetail: data,
      message: null,
    };
  } catch (e: any) {
    console.log('Create WishList network error:', e.message || e);
    return {
      wishListDetail: null,
      message: 'Network error',
    };
  }
}

export async function addExpToWishList(
  wishListId: string,
  experienceId: string,
): Promise<AddExperienceToWishListResponse> {
  try {
    const res = await apiFetch.post(
      `/api/wishlists/${wishListId}/experiences/${experienceId}`,
    );
    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Add experience to wishlists failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        isSuccess: true,
        message: res.status.toString(),
      };
    }
    const data = await safeJson<AddExperienceToWishListResponse>(res);
    if (!data || !data?.isSuccess) {
      console.log(
        'Add experience to wishlists, but API reported failure or invalid response:',
        data,
      );
      return {
        isSuccess: false,
        message:
          'Get wishlist detail, but API reported failure or invalid response:' +
          data,
      };
    }
    console.log('Wishlist created:', data);
    return data;
  } catch (e: any) {
    console.log('Add experience to wishlists network error:', e.message || e);
    return {
      isSuccess: false,
      message: 'Network error',
    };
  }
}

export async function removeExpToWishList(
  wishListId: string,
  experienceId: string,
): Promise<RemoveExperienceFromWishListResponse> {
  try {
    const res = await apiFetch.delete(
      `/api/wishlists/${wishListId}/experiences/${experienceId}`,
    );
    if (!res.ok) {
      const errorText = await res.text();
      console.log(
        'Delete experience from wishlists failed with status:',
        res.status,
        errorText || 'No body',
      );
      return {
        isSuccess: true,
        message: res.status.toString(),
      };
    }
    const data = await safeJson<RemoveExperienceFromWishListResponse>(res);
    if (!data || !data?.isSuccess) {
      console.log(
        'Delete experience from wishlists, but API reported failure or invalid response:',
        data,
      );
      return {
        isSuccess: false,
        message:
          'Delete experience from wishlists, but API reported failure or invalid response:' +
          data,
      };
    }
    console.log('Wishlist created:', data);
    return data;
  } catch (e: any) {
    console.log('Add experience to wishlists network error:', e.message || e);
    return {
      isSuccess: false,
      message: 'Network error',
    };
  }
}
