import { Slot } from './experience';
import { HostDetail, userProfile } from './host';

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
    experienceId: string;
    tourName: string;
    image: any;
    slot: Slot;
    adultPrice: number;
    childPrice: number;
    quantity: {
      àdult: number;
      children: number;
      total: number;
    };
    total: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    note?: string;
  };
  paymentSuccessScreen: {
    total: number;
    method: string;
    bookingCode: string;
    bookingId: string;
  };
  paymentProcessingScreen: {
    paymentUrl: string;
    deeplink?: string;
  };

  bookingTab: undefined;
  booking: undefined;
  bookingList: { refresh: Boolean };
  bookingDetail: {
    bookingId: string;
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

  post: {
    userProfile: userProfile | undefined;
  };
  comment: undefined;

  search: { categoryId?: string };
  searchTab: undefined;

  wishListTab: undefined;
  wishList: undefined;
  personalScheduleScreen: undefined;
  wishListScreen: undefined;
  wishListDetail: { wishListId: string };
};
