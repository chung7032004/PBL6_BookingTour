import { Quantity } from '../src/Home/quantity';
import { HostDetail } from './host';

export type RootStackParamList = {
  AppTabs: undefined;

  notice: undefined;

  homeTab: undefined;
  home: undefined;
  tourDetail: {
    id: string;
  };
  provider: {
    hostDetail: HostDetail | null;
  };
  paymentScreen: {
    tourName: string;
    image: any;
    date: string;
    time: string;
    pricePerGuest: number;
    quantity: {
      adult: number;
      children: number;
      total: number;
    };
    total: number;
  };
  paymentSuccessScreen: {
    total: number;
    method: string;
  };

  bookingTab: undefined;
  booking: undefined;
  bookingList: { refresh: Boolean };
  bookingDetail: {
    booking: {
      id: number;
      nameTour: string;
      image: any;
      date: string;
      quantity: Quantity;
      total: number;
      status: string;
    };
  };
  reviewScreen: { bookingId: string };

  login:
    | { redirect?: keyof RootStackParamList; params?: any; message?: string }
    | undefined;
  signup: undefined;
  forgotPassword: undefined;
  verifyCode: { email: string; message?: string };
  resetPassword: { email: string; message?: string };

  profileTab: undefined;
  profile: undefined;
  profileDetail: undefined;
  profileEdit: undefined;
  contact: undefined;

  port: undefined;
  comment: undefined;

  search: undefined;
  searchTab: undefined;

  wishListTab: undefined;
  wishList: undefined;
  personalScheduleScreen: undefined;
  wishListScreen: undefined;
  wishListDetail: { wishListId: string };
};
