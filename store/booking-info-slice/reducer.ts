import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BookingInformation {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

const initialState: any = {
  startDate: "",
  endDate: "",
  numberOfDays: 0,
};

const slice = createSlice({
  name: "bookingInformation",
  initialState,
  reducers: {
    eraseBookingInformationState: (state) => {
      state.startDate = "";
      state.endDate = "";
      state.numberOfDays = 0;
    },
    setBookingStartDate: (
      state,
      action: PayloadAction<BookingInformation["startDate"]>
    ) => {
      state.startDate = action.payload;
    },
    setBookingEndDate: (
      state,
      action: PayloadAction<BookingInformation["startDate"]>
    ) => {
      state.startDate = action.payload;
    },
    setBookingDays: (
      state,
      action: PayloadAction<BookingInformation["startDate"]>
    ) => {
      state.numberOfDays = action.payload;
    },
  },
});

export const selectBookingInformation = (store: any) =>
  store.BookingInformation as "BookingInformation";
export const {
  eraseBookingInformationState,
  setBookingDays,
  setBookingEndDate,
  setBookingStartDate,
} = slice.actions;
export default slice.reducer;
