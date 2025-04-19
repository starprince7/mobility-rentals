import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BookingInformation {
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  totalPrice: number;
}

const initialState: BookingInformation = {
  startDate: new Date(),
  endDate: new Date(),
  numberOfDays: 0,
  totalPrice: 0,
};

const slice = createSlice({
  name: "bookingInformation",
  initialState,
  reducers: {
    eraseBookingInformationState: (state) => {
      state.startDate = new Date();
      state.endDate = new Date();
      state.numberOfDays = 0;
      state.totalPrice = 0;
    },
    setBookingStartDate: (
      state,
      action: PayloadAction<BookingInformation["startDate"]>
    ) => {
      state.startDate = action.payload;
    },
    setBookingEndDate: (
      state,
      action: PayloadAction<BookingInformation["endDate"]>
    ) => {
      state.endDate = action.payload;
    },
    setBookingDays: (
      state,
      action: PayloadAction<BookingInformation["numberOfDays"]>
    ) => {
      state.numberOfDays = action.payload;
    },
    setBookingTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const selectBookingInformation = (store: any) =>
  store.BookingInformation as BookingInformation;
export const {
  eraseBookingInformationState,
  setBookingDays,
  setBookingEndDate,
  setBookingStartDate,
  setBookingTotalPrice,
} = slice.actions;
export default slice.reducer;
