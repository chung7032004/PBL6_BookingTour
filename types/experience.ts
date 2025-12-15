export interface Media {
  id: string;
  url: string;
  order: number;
}
export interface Itinerary {
  id: string;
  stepNumber: number;
  photoUrl: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}
export interface TourCardProps {
  id: string;
  title: string;
  description: string;
  maxParticipants: number;
  address: string;
  category: Category;
  adultPrice: number;
  childPrice: number;
  duration: number;
  averageRating: number;
  totalReviews: number;
  media: Media[];
}
export interface Experience {
  id: string;
  hostId: string;
  title: string;
  description: string;
  address: string;
  district: string;
  city: string;
  country: string;
  adultPrice: number;
  childPrice: number;
  duration: number;
  maxParticipants: number;
  category: Category;
  activityLevel: string;
  skillLevel: string;
  minAge: number;
  accessibility: string | null;
  status: 'Draft' | 'Published' | 'Archived';
  cancellationPolicy: string;
  language: string;
  createdAt: string;
  updatedAt: string | null;
  media: Media[];
  itineraries: Itinerary[];
  distance: number | null;
  isFavorite: boolean;
  totalReviews: number;
  averageRating: number;
}

export interface ExperiencesResponse {
  data: TourCardProps[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface Recommendation {
  experience: Experience;
  score: number;
  reason: string;
}
export interface ExperiencesRecommendation {
  recommendations: Recommendation[];
  total: number;
}

export interface Slot {
  date: string;
  startTime: string;
  endTime: string;
  spotsAvailable: number;
}
