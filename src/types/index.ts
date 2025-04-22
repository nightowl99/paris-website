export interface TourType {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  bookingLink: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
}

export interface AttractionType {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  hours: string;
  price: string;
  website: string;
  rating: number;
}