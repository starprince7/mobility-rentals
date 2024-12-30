import { configureStore } from "@reduxjs/toolkit";

// reducers
import bookingReducer from "./booking-info-slice/reducer";
import vehicleInformationReducer from "./vehicleSlice/reducer";

export const store = configureStore({
  reducer: {
    BookingInformation: bookingReducer,
    VehicleDetail: vehicleInformationReducer,
    // auth: "",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
