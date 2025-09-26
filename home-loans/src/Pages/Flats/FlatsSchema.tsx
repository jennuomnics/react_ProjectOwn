export interface addFlatSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: File | null;
  bhkType: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floorNumber: number;
  totalFloors: number;
  furnishing: string;
  availability: string;
  parking: string;
  nearbyAmenities: string[];
  areaSqFt: number;
  acAvailable: boolean;
  liftAvailable: boolean;
  security: boolean;
  powerBackup: boolean;
}

