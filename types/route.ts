type RootStackParamList = {
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

  booking: undefined;
  bookingList: undefined;
  bookingDetail: undefined;
  reviewScreen: undefined;

  login: undefined;
  signup: undefined;
  forgotPassword: undefined;

  profile: undefined;
  profileDetail: undefined;
  profileEdit: undefined;

  port: undefined;
  comment: undefined;

  search: undefined;
  searchTab: undefined;

  wishList: undefined;
  personalScheduleScreen: undefined;
  wishListScreen: undefined;
  wishListDetail: undefined;
};
