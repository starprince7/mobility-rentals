export interface IAvailableVehicles {
  id: number;
  make: string;
  model: string;
  year: number;
  rentalPricePerDay: number;
  location: string;
  availability: boolean;
  images: string[];
  features: IFeatures[];
  description?: string;
  owner: {
    name: string;
    contact: string;
    image?: string
  };
}

interface IFeatures {
  name: string;
  value: string;
}