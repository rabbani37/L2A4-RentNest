import { PropertyAvailability } from "../../../generated/prisma/enums";





export interface IProperty {
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  amenities: string[];
  images: string[];
  availability: PropertyAvailability
  categoryId: string;
}