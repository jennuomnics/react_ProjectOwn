export interface plotSchema {
  id?: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  areaSqFt: number;
  plotType: string;
  facingDirection: string;
  roadWidth: string;
  availability: string;
  nearbyAmenities: string[];
}
