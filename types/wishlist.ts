import { Experience } from './experience';

export interface WishlistResponse {
  id: string;
  isSuccess: boolean;
  message: string;
}
export interface DeleteWishlistResponse {
  isSuccess: boolean;
  message: string;
}
export interface MyWishListResponse {
  id: string;
  name: string;
  experienceCount: number;
}
export interface WishListDetailResponse {
  id: string;
  name: string;
  experiences: Experience[];
}
export interface AddExperienceToWishListResponse {
  isSuccess: boolean;
  message: string;
}
export interface RemoveExperienceFromWishListResponse {
  isSuccess: boolean;
  message: string;
}
