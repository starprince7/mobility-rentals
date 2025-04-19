// Expanded Interface
export interface IVehicle {
  // Core vehicle properties
  // Listing-specific properties 1
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'automatic' | 'manual';
  seatingCapacity: number;
  vehicleType: "" | 'sedan' | 'suv' | 'truck' | 'van' | 'luxury' | 'sports' | 'compact' | 'other';
  vehicleColor: string;
  vehicleCondition: "" | 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  basicFeatures: BasicFeatures;
  advancedFeatures: AdvancedFeature[];
  
  // Listing-specific properties 2
  ownerId: any; // Reference to user instead of embedding full owner
  rentalPricePerDay: number;
  location: Location;
  description: string;
  availability: boolean;
  availabilityCalendar: DateRange[];
  allowedMileagePerDay: number;
  securityDeposit: number;
  vehicleStatus: "" | 'available' | 'rented' | 'maintenance' | 'unavailable';
  vehicleIdentificationNumber: string; // Unique identifier for the vehicle. IMPORTANT FOR INSURANCE.
  pickupInstructions: string;
  additionalFees: Fee[];
  instantBooking: boolean;
  cancellationPolicy: CancellationPolicy;
  bookingRequirements: BookingRequirements;
  insuranceDetails: InsuranceDetails;
  //  Rental history
  maintenanceRecords: MaintenanceRecord[];
  
  // New safety and approval fields
  safetyChecklist: SafetyChecklist;
  suspensionStatus: SuspensionStatus | null;
  listingApprovalStatus: 'pending' | 'approved' | 'rejected';
  
  // Derived/calculated properties
  rating: number;
  reviewCount: number;
}

// New interfaces for safety and approval

interface SafetyChecklist {
  brakesInspected: boolean;
  tiresConditionChecked: boolean;
  lightsWorking: boolean;
  engineInspected: boolean;
  safetyFeaturesVerified: boolean;
  interiorClean: boolean;
  fluidLevelsChecked: boolean;
  batteryTested: boolean;
  // New safety fields
  dashboardWarningsFree: boolean; // No warning lights on dashboard
  seatbeltsAndAirbagsVerified: boolean; // All seatbelts and airbags working properly
  lastInspectionDate: Date;
  nextInspectionDue: Date;
  inspectedBy: string;
  notes: string;
  overallSafetyScore: number; // Optional score out of 100
  passedSafetyInspection: boolean;
}

interface SuspensionStatus {
  isSuspended: boolean;
  suspensionType: 'temporary' | 'permanent';
  startDate: Date;
  endDate: Date | null; // null if permanent or end date not set
  reason: string;
  suspendedBy: string; // admin or system ID
  appealStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  notes: string;
}

// Existing interfaces remain unchanged
interface IFeatures {
  name: string;
  value: string;
}

export type BasicInfo = {
  label: string;
  data: any;
};

interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  location: {
    type: 'Point';
    coordinates: number[];
  }
}

interface BasicFeatures {
  numberOfSeats: number;
  doors: number;
  ecoFriendly: string;
  milesPerGallon: number;
}

interface AdvancedFeature {
  label: string;
  value: boolean;
}

interface Owner {
  name: string;
  contact: string;
}

interface DateRange {
  startDate: string; // ISO string
  endDate: string; // ISO string
}

interface CancellationPolicy {
  type: 'flexible' | 'moderate' | 'strict';
  refundPercentage: number;
  cutoffHours: number;
  description: string;
}

interface BookingRequirements {
  minimumAge: number;
  drivingLicenseRequired: boolean;
  depositRequired: boolean;
  verificationRequired: boolean;
}

interface Fee {
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  description: string;
}

interface MaintenanceRecord {
  date: string;
  description: string;
  mileage: number;
  cost?: number;
  serviceProvider?: string;
  serviceType?: 'routine' | 'repair' | 'inspection' | 'other';
  notes?: string;
}

interface RentalHistory {
  renterId: number;
  startDate: string;
  endDate: string;
  rating: number;
  comment?: string;
  totalCost?: number;
  mileageDriven?: number;
  incidents?: string[];
  returnCondition?: 'excellent' | 'good' | 'fair' | 'poor';
}

interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  coverage: 'basic' | 'standard' | 'comprehensive' | 'premium';
  expiryDate?: string;
  deductible?: number;
  coverageLimit?: number;
  includedServices?: string[];
  contactNumber?: string;
}