import { IVehicle } from "./vehicle";

export interface IUser {
  // Core user identification
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  // Authentication and security
  hashedPassword?: string;
  role: 'renter' | 'owner' | 'admin';
  accountStatus: 'active' | 'suspended' | 'pending' | 'deleted';

  // Personal information
  dateOfBirth?: Date;
  nationality?: string;
  primaryLanguage?: string;

  // Location and contact details
  primaryAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  // Verification and documentation
  drivingLicense?: {
    number: string;
    issueDate: Date;
    expiryDate: Date;
    issuingCountry: string;
    verified: boolean;
  };

  // User preferences
  preferences?: {
    preferredVehicleTypes: IVehicle['vehicleType'][];
    preferredPickupLocations: string[];
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  // Rental-related information
  rentalProfile?: {
    totalRentals: number;
    currentRentals: number;
    completedRentals: number;
    canceledRentals: number;
    averageRating: number;
  };

  // Financial information
  paymentMethods?: {
    cardType: 'credit' | 'debit';
    lastFourDigits: string;
    expiryDate: string;
    isDefault: boolean;
  }[];

  // Vehicle ownership (if applicable)
  ownedVehicles?: number[]; // Array of vehicle IDs

  // Rental history
  rentalHistory?: RentalHistory[];

  // Trust and verification
  trustScore?: number;
  verificationStatus?: {
    emailVerified: boolean;
    phoneVerified: boolean;
    identityVerified: boolean;
    drivingLicenseVerified: boolean;
  };

  // Additional user metadata
  registrationDate?: Date;
  lastLoginDate?: Date;

  // Optional social integration
  socialAccounts?: {
    platform: 'google' | 'facebook' | 'apple';
    socialId: string;
  }[];

  // Wallet system (updated from accountCredit)
  accountWallet: number;

  // Reference to admin record if user is an admin
  adminId?: number;

  // Notifications and communication
  notifications?: {
    id: number;
    type: 'booking' | 'reminder' | 'promotion' | 'system';
    message: string;
    date: Date;
    read: boolean;
  }[];
}

// Rental history interface
interface RentalHistory {
  vehicleId: number;
  startDate: string;
  endDate: string;
  rating: number;
  comment?: string;
  totalCost?: number;
  mileageDriven?: number;
  incidents?: string[];
  returnCondition?: 'excellent' | 'good' | 'fair' | 'poor';
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