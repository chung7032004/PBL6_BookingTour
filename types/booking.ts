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
