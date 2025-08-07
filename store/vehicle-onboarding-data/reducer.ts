import apiClient from "@/config/api";
import { IVehicle } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { router } from 'expo-router'

const HOST_URL = "http://localhost:3000/api" // process.env.EXPO_PUBLIC_APP_API_URL

// Define the photo structure
type PhotoCategory = 'exterior' | 'interior' | 'damage';

interface Photos {
  exterior: string[];
  interior: string[];
  damage: string[];
}

interface IVehicleOnboarding {
  vehiclePhotosUploaded?: boolean;
  autoApproveBookings?: boolean;
  vehicleAvailabilty?: IVehicle['availabilityCalendar']
  // Vehicle details
  vehicleIdentificationNumber?: IVehicle['vehicleIdentificationNumber'];
  vehicleStatus?: IVehicle['vehicleStatus'];
  milesPerGallon?: IVehicle['basicFeatures']['milesPerGallon'];
  vehicleCondition?: IVehicle['vehicleCondition'];
  vehicleColor?: IVehicle['vehicleColor'];
  vehicleType?: IVehicle['vehicleType'];
  seatingCapacity?: number;
  mileage?: string;
  fuelType?: 'petrol' | 'diesel' | 'electric' | 'hybrid' | '';
  transmission?: 'automatic' | 'manual' | '';
  // Vehicle photos
  photos?: Photos;
  // Boolean field that track of core fields below have been completed.
  isComplete?: boolean;
  // Vehicle physical properties
  trim?: string;
  style?: string;
  // Vehicle manufacturer data
  make?: string;
  model?: string;
  year?: string;
  // Vehicle region documentation
  licensePlate?: string;
  // Location specific data
  country: string;
  countryCode: string;
  state: string;
  city: string;
  streetAddress: string;
  zipCode: string;
  latitude: number,
  longitude: number
  // Asynchrous-Actions
  requestStatus?: "idle" | "loading" | "succeeded" | "failed";
  error?: null | string;
  locationData?: {
    isValid: boolean,
    reason?: string,
    region?: string,
    distanceToBorder?: number
  }
  data?: {} | null
  vechicleId?: string | null
}

const initialState: IVehicleOnboarding = {
  milesPerGallon: 0,
  vehicleColor: '',
  vehicleCondition: '',
  vehicleIdentificationNumber: '',
  vehicleStatus: 'available',
  vehicleType: '',
  autoApproveBookings: false,
  // indication of whether the vehicle photos have been uploaded.
  vehiclePhotosUploaded: false,
  vehicleAvailabilty: [],
  // Initialize photos object
  photos: {
    exterior: [],
    interior: [],
    damage: [],
  },
  isComplete: false,
  fuelType: '',
  mileage: '',
  transmission: '',
  seatingCapacity: 0,
  make: '',
  model: '',
  year: '',
  trim: '',
  style: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  countryCode: '',
  licensePlate: '',
  streetAddress: '',
  latitude: 0,
  longitude: 0,
  requestStatus: "idle",
  locationData: {
    isValid: false,
    reason: '',
    region: '',
    distanceToBorder: undefined
  },
  data: null,
  error: null,
  vechicleId: null,
};

// Async
type FetchParams = {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
};

/**
 * Use to ensure that the users selected location
 * is allowed and not outside of Lagos, Nigeria.
 */
export const validateVehicleLocation = createAsyncThunk<any, FetchParams>(
  "vehicle_onboarding/validateVehicleLocation",
  async ({ latitude, longitude, city, country }) => {
    if (!latitude || !longitude || !city || !country) return alert("Missing required parameters for vehicle location validation.");
    // alert("Making API request!")
    return await apiClient.post(`${HOST_URL}/vehicles/validate-location`, {
      latitude,
      longitude,
      city,
      country,
    });
  }
);

// Async thunk for uploading vehicle photos
export const uploadVehiclePhotos = createAsyncThunk<
  any,
  { photos: Photos, vehicleId?: string }
>(
  "vehicle_onboarding/uploadVehiclePhotos",
  async ({ photos, vehicleId }) => {
    try {
      // Create a FormData object to handle the multipart/form-data upload
      const formData = new FormData();

      // Process each category of photos
      Object.entries(photos).forEach(([category, categoryPhotos]) => {
        categoryPhotos.forEach((photoUri: any, index: number) => {
          const fileType = photoUri.split('.').pop() || 'jpg';
          const fileName = `vehicle_${category}_${index}.${fileType}`;

          // Append each photo to the form data
          formData.append('photos', {
            uri: photoUri,
            name: fileName,
            type: `image/${fileType}`,
          } as any);

          // Include metadata about the photo
          formData.append('metadata', JSON.stringify({
            category,
            index,
            fileName,
          }));
        });
      });

      // Add vehicle ID if available
      if (vehicleId) {
        formData.append('vehicleId', vehicleId);
      }

      const response = await apiClient.post(`${HOST_URL}/vehicles/photos`, formData, {
        headers: {
          // Authorization: `Bearer ${"access_token"}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err) {
      console.log("Photo upload error:", err);
      throw err;
    }
  }
);

// Create this Vehicle on the server, update owner details next.
export const createVehicleListing = createAsyncThunk<any, IVehicleOnboarding>(
  "vehicle_onboarding/createVehicleListing",
  async (vehicleData) => {
    if (!vehicleData) return alert("Missing required parameters for vehicle location validation.");

    try {
      return await apiClient.post(`${HOST_URL}/vehicles`, {
        ...vehicleData,
        location: {
          type: 'Point',
          coordinates: [vehicleData.longitude, vehicleData.latitude],
          city: vehicleData.city,
          country: vehicleData.country,
          latitude: vehicleData.latitude,
          longitude: vehicleData.longitude,
        }
      });
    }
    catch (err) {
      console.log("Vehicle listing error: ", err)
      return err
    }
  }
);

const slice = createSlice({
  name: "vehicle_onboarding",
  initialState,
  reducers: {
    resetLocation: (state) => {
      state.city = "";
      state.country = "";
      state.countryCode = "";
      state.state = "";
      state.streetAddress = "";
      state.zipCode = "";
      state.latitude = 0;
      state.longitude = 0;
    },
    setAutoApproveBookings: (state, action: PayloadAction<boolean>) => {
      state.autoApproveBookings = action.payload
    },
    setLocation: (state, action: PayloadAction<IVehicleOnboarding>) => {
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.countryCode = action.payload.countryCode;
      state.state = action.payload.state;
      state.streetAddress = action.payload.streetAddress;
      state.zipCode = action.payload.zipCode;
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
    // Add a single photo to a specific category
    addVehiclePhoto: (state, action: PayloadAction<{ category: PhotoCategory, photoUri: string }>) => {
      const { category, photoUri } = action.payload;
      state.photos?.[category].push(photoUri);
    },
    // Remove a photo from a specific category by index
    removeVehiclePhoto: (state, action: PayloadAction<{ category: PhotoCategory, index: number }>) => {
      const { category, index } = action.payload;
      if (state.photos)
        state.photos[category] = state.photos[category].filter((_, i) => i !== index);
    },
    // Set all photos for a specific category
    setVehiclePhotos: (state, action: PayloadAction<{ category: PhotoCategory, photos: string[] }>) => {
      const { category, photos } = action.payload;
      if (state.photos)
        state.photos[category] = photos;
    },
    // Set the entire photos object
    setAllVehiclePhotos: (state, action: PayloadAction<Photos>) => {
      state.photos = action.payload;
    },
    // Clear all photos
    clearVehiclePhotos: (state) => {
      state.photos = {
        exterior: [],
        interior: [],
        damage: [],
      };
    },
    setLicensePlate: (state, action: PayloadAction<string>) => {
      state.licensePlate = action.payload;
    },
    setMake: (state, action: PayloadAction<string>) => {
      state.make = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setTrim: (state, action: PayloadAction<string>) => {
      state.trim = action.payload;
    },
    setStyle: (state, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
    setMileage: (state, action: PayloadAction<string>) => {
      state.mileage = action.payload;
    },
    setTransmission: (state, action: PayloadAction<IVehicleOnboarding['transmission']>) => {
      state.transmission = action.payload;
    },
    setFuelType: (state, action: PayloadAction<IVehicleOnboarding['fuelType']>) => {
      state.fuelType = action.payload;
    },
    setVehicleAvailability: (state, action: PayloadAction<IVehicleOnboarding['vehicleAvailabilty']>) => {
      state.vehicleAvailabilty = action.payload
    },
    setVehicleIdentificationNumber: (state, action: PayloadAction<IVehicleOnboarding['vehicleIdentificationNumber']>) => {
      state.vehicleIdentificationNumber = action.payload;
    },
    setVehicleStatus: (state, action: PayloadAction<IVehicleOnboarding['vehicleStatus']>) => {
      state.vehicleStatus = action.payload;
    },
    setMilesPerGallon: (state, action: PayloadAction<IVehicleOnboarding['milesPerGallon']>) => {
      state.milesPerGallon = action.payload;
    },
    setVehicleCondition: (state, action: PayloadAction<IVehicleOnboarding['vehicleCondition']>) => {
      state.vehicleCondition = action.payload;
    },
    setVehicleColor: (state, action: PayloadAction<IVehicleOnboarding['vehicleColor']>) => {
      state.vehicleColor = action.payload;
    },
    setVehicleType: (state, action: PayloadAction<IVehicleOnboarding['vehicleType']>) => {
      state.vehicleType = action.payload;
    },
    setSeatingCapacity: (state, action: PayloadAction<number>) => {
      state.seatingCapacity = action.payload;
    },
  },
  extraReducers(builder) {
    // ************* Validate Allowed Vehicle Location with API *************
    builder.addCase(validateVehicleLocation.pending, (state, action) => {
      state.requestStatus = "loading";
    });
    builder.addCase(validateVehicleLocation.rejected, (state, action) => {
      (state.requestStatus = "failed"),
        (state.error = action.error.message!);
    });
    builder.addCase(validateVehicleLocation.fulfilled, (state, action) => {
      if (action.payload?.error) {
        (state.requestStatus = "succeeded");
        state.locationData = action.payload;
      } else {
        (state.requestStatus = "succeeded")
      }
    });
    // ************* Upload Vehicle Photos with API *************
    builder.addCase(uploadVehiclePhotos.pending, (state) => {
      state.requestStatus = "loading";
      state.vehiclePhotosUploaded = true
    });
    builder.addCase(uploadVehiclePhotos.rejected, (state, action) => {
      state.requestStatus = "failed";
      state.error = action.error.message!;
      alert("Error uploading photos: " + action.error.message);
    });
    builder.addCase(uploadVehiclePhotos.fulfilled, (state, action) => {
      state.requestStatus = "succeeded";
      // You might want to update the photos with URLs from the server if needed
      if (action.payload?.photoUrls) {
        state.vehiclePhotosUploaded = true
        // Handle server response if it returns updated URLs
        // This depends on your API response structure
      }
    });
    // ************* Create Vehicle Listing with API *************
    builder.addCase(createVehicleListing.pending, (state, action) => {
      state.requestStatus = "loading";
    });
    builder.addCase(createVehicleListing.rejected, (state, action) => {
      (state.requestStatus = "failed"),
        (state.error = action.error.message!);
      alert("Error creating vehicle listing: " + action.error.message);
    });
    builder.addCase(createVehicleListing.fulfilled, (state, action) => {
      if (action.payload?.error) {
        (state.requestStatus = "succeeded");
        state.error = action.payload;
      } else {
        (state.requestStatus = "succeeded")
        state.isComplete = true
        state.vechicleId = action.payload?.id
        state.data = action.payload;
        router.push("/(protected)/vehicle-listing-screens/(collect-personal-info)/collect_profile_information");
      }
    });
  }
});

export const selectVehicleOnboardingStore = (store: any) =>
  store.VehicleOnboarding as IVehicleOnboarding;
export const {
  resetLocation,
  setLocation,
  setLicensePlate,
  setMake,
  setModel,
  setYear,
  setTrim,
  setStyle,
  setMileage,
  setFuelType,
  setVehicleAvailability,
  setTransmission,
  setAutoApproveBookings,
  setVehicleIdentificationNumber,
  setVehicleStatus,
  setMilesPerGallon,
  setVehicleCondition,
  setVehicleColor,
  setVehicleType,
  setSeatingCapacity,
  // Export the new photo-related actions
  addVehiclePhoto,
  removeVehiclePhoto,
  setVehiclePhotos,
  setAllVehiclePhotos,
  clearVehiclePhotos,
} = slice.actions;
export default slice.reducer;