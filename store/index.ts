import { configureStore } from "@reduxjs/toolkit";

// reducers
import bookingReducer from "./booking-info-slice/reducer";

export const store = configureStore({
  reducer: {
    BookingInformation: bookingReducer,
    // auth: "",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
