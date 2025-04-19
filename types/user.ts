export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  dateJoined: string;
  address?: Address;

  // User verification
  verified: boolean;
  identityVerified: boolean;
  drivingLicenseVerified: boolean;

  // User as owner
  ownedVehicles?: number[]; // IDs of vehicles they own
  // accountDetails?: BankAccountDetails;
  preferredPaymentMethod?: string;

  // User as renter
  rentalHistory?: RentalRecord[];
  savedVehicles?: number[]; // IDs of vehicles saved/favorited
  drivingLicense?: DrivingLicense;

  // Ratings and reviews
  overallRating?: number;
  reviewsAsOwner?: Review[];
  reviewsAsRenter?: Review[];

  // Preferences
  // notificationPreferences?: NotificationPreferences;
  // communicationPreferences?: CommunicationPreferences;
}

export interface RentalRecord {
  rentalId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  ownerRating?: number;
  vehicleRating?: number;
  ownerReview?: string;
  vehicleReview?: string;
  mileageDriven?: number;
  incidents?: string[];
}

export interface DrivingLicense {
  number: string;
  country: string;
  state?: string;
  expiryDate: string;
  issuedDate: string;
  verified: boolean;
}

export interface Review {
  id: number;
  reviewerId: number;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}