export interface HostInTour {
  id: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
}
export interface HostDetail {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string;
  country: string;
  bio: string;
  spokenLanguages: (string | null)[];
  location: string;
  hostingSince: string | null;
  isVerified: boolean;
  verifyStatus: string;
  documentUrl: string;
  verifyReason: string | null;
  verifiedAt: string;
  responseTime: string | null;
  totalExperiences: number;
  totalBookings: number;
  totalReviews: number;
  ratingAvg: number | null;
  work: string;
  education: string;
  funFact: string;
  topicsOfInterest: string[]; // mảng string chuẩn
  desiredHostingStyle: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedInUrl: string | null;
}

export interface userProfile {
  id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  avatarUrl: string;
  country: string;
}
