export type RootStackParamList = {
  AppTabs: undefined;

  homeTab: undefined;
  home: undefined;
  tourDetail: undefined;
  provider: undefined;
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
  bookingList: undefined;
  bookingDetail: undefined;
  reviewScreen: undefined;

  login: { redirect?: keyof RootStackParamList; params?: any } | undefined;
  signup: undefined;
  forgotPassword: undefined;

  profileTab: undefined;
  profile: undefined;
  profileDetail: undefined;
  profileEdit: undefined;

  port: undefined;
  comment: undefined;

  search: undefined;
  searchTab: undefined;

  wishListTab: undefined;
  wishList: undefined;
  personalScheduleScreen: undefined;
  wishListScreen: undefined;
  wishListDetail: undefined;
};
