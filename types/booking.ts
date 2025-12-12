export interface CreateBookingRequest {
  experienceId: string;
  date: string;
  startTime: string;
  endTime: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string | '';
}

export interface CreateBookingResponse {
  message: string;
  paymentUrl: string;
  success: boolean;
}

export interface Booking {
  id: string;
  experienceId: string;
  experienceTitle: string;
  imageUrl: any;
  bookingCode: string;
  date: string;
  startTime: string;
  endTime: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: BookingStatus;
}
export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
export interface BookingResponse {
  success: boolean;
  data: Booking[];
}

export type Currency = 'VND' | string;
export type PaymentProvider = 'VnPay' | string;
export type PaymentStatus = 'Pending' | 'Success' | 'Failed' | string;

export interface Payment {
  id: string;
  bookingId: string;
  amount: number; // 500000.00
  currency: Currency; // "VND"
  provider: PaymentProvider; // "VnPay"
  method?: string | null; // có thể null
  status: PaymentStatus; // "Pending"
  paymentUrl?: string | null; // URL thanh toán (có thể null)
  transactionId?: string | null;
  paidAt?: string | null; // ISO datetime nếu đã thanh toán
  createdAt: string; // ISO datetime
}

export interface Cancellation {
  reason?: string | null;
  cancelledBy?: string | null;
  cancelledAt?: string | null;
}

export interface BookingDetail {
  id: string;
  userId: string;
  hostId: string;
  experienceId: string;
  bookingCode: string;
  status: BookingStatus;
  date: string; // "YYYY-MM-DD"
  startTime?: string | null; // "HH:MM:SS"
  endTime?: string | null; // "HH:MM:SS"
  adults: number;
  children: number;
  totalPrice: number; // decimal
  platformFee?: number | null;
  hostAmount?: number | null;
  firstName: string;
  lastName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  notes?: string | null;
  createdAt: string; // ISO datetime
  updatedAt?: string | null;
  payment?: Payment | null;
  cancellation?: Cancellation | null;
}
