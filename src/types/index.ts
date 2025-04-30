export interface TourType {
  id: string;
  name: string;
  affLink: string;
  thumbnail: string;
  image: string;
  price: number;
  description: string;
  category: string;
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