import { configureStore } from "@reduxjs/toolkit";

// reducers
import bookingReducer from "./booking-data/reducer";
import vehicleInformationReducer from "./vehicle-data/reducer";
import vehicleonboardingReducer from "./vehicle-onboarding-data/reducer";
import verificationCodesReducer from "./verification-codes/reducer";
import profileImageReducer from "./profile-photo/reducer";
import driversLicenseReducer from "./drivers-license/reducer";
import hostReducer from "./host/reducer";

export const store = configureStore({
  reducer: {
    BookingInformation: bookingReducer,
    VehicleDetail: vehicleInformationReducer,
    VehicleOnboarding: vehicleonboardingReducer,
    VerificationCodes: verificationCodesReducer,
    ProfileImageStore: profileImageReducer,
    DriverLicense: driversLicenseReducer,
    Host: hostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
