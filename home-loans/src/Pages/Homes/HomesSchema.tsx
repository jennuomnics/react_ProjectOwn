export interface addHomeSchema {
  id?: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  bhkType: string;
  bedrooms: number;
  bathrooms: number;
  kitchenCount: number;
  pujaRoom: boolean;
  ac: boolean;
  amenitiesNearby: string[];
}


export interface homeSchema {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  bhkType: string;
  bedrooms: number;
  bathrooms: number;
  kitchenCount: number;
  pujaRoom: boolean;
  ac: boolean;
  amenitiesNearby: string[];
}
