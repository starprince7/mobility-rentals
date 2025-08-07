import { configureStore } from "@reduxjs/toolkit";

// reducers
import bookingReducer from "./booking-data/reducer";
import vehicleInformationReducer from "./vehicle-data/reducer";
import vehicleOnboardingReducer from "./vehicle-onboarding-data/reducer";
import verificationCodesReducer from "./verification-codes/reducer";
import profileImageReducer from "./profile-photo/reducer";
import driversLicenseReducer from "./drivers-license/reducer";
import hostReducer from "./host/reducer";
import payoutReducer from "./payout-data/reducer";
import safetyStandardReducer from "./accept-safety-standard/reducer";
import authReducer from "./auth-data/reducer";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    BookingInformation: bookingReducer,
    VehicleDetail: vehicleInformationReducer,
    VehicleOnboarding: vehicleOnboardingReducer,
    VerificationCodes: verificationCodesReducer,
    ProfileImageStore: profileImageReducer,
    DriverLicense: driversLicenseReducer,
    Host: hostReducer,
    PayoutData: payoutReducer,
    AcceptSafetyStandards: safetyStandardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
