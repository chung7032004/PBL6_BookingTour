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
}

export interface ExperiencesResponse {
  data: Experience[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface TourCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  cancellation?: string;
  activityLevel?: string;
  showFavorite?: boolean;
}
