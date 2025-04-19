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
  name: "write_name_for_this_slice",
  initialState,
  reducers: {
    reduxAction1: (state) => {
      state.startDate = "";
      state.endDate = "";
      state.numberOfDays = 0;
    },
    reduxAction2: (state, action: PayloadAction<BookingInformation>) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.numberOfDays = action.payload.numberOfDays;
    },
  },
});

export const selectBookingInformation = (store: any) =>
  store.BookingInformation as "BookingInformation";
export const { reduxAction1, reduxAction2 } = slice.actions;
export default slice.reducer;
