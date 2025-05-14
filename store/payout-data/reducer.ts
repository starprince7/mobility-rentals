import apiClient from "@/config/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const HOST_URL = 'http://localhost:3000/api' // process.env.EXPO_PUBLIC_APP_API_URL

interface PayoutData {
  // The vehicle rental price.
  rentalPrice: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bvn: string;
  isComplete: boolean;
  error: string;
  networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PayoutData = {
  rentalPrice: 0,
  bankName: '',
  accountName: '',
  accountNumber: '',
  bvn: '',
  isComplete: false,
  error: '',
  networkStatus: 'idle',
};

export const submitPayoutData = createAsyncThunk<any, PayoutData>(
  "payoutData/submitPayoutData",
  async (payoutData) => {
    const { bankName, accountName, accountNumber, bvn } = payoutData;
    // Validate the payout data before sending it to the server
    if (!bankName || !accountName || accountNumber.length !== 10 || bvn.length !== 11) {
      throw new Error("Invalid payout data");
    }
    const requestPayload = { bankName, accountName, accountNumber, bvn }
    return apiClient.post(`${HOST_URL}/user/payout-data`, { payoutData: requestPayload }, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${access_token}`
      }
    })
  }
);

const slice = createSlice({
  name: "payoutData",
  initialState,
  reducers: {
    resetState: () => initialState,
    setRentalPrice: (state, action: PayloadAction<number>) => {
      state.rentalPrice = action.payload;
    },
    setBankName: (state, action: PayloadAction<string>) => {
      state.bankName = action.payload;
    },
    setAccountName: (state, action: PayloadAction<string>) => {
      state.accountName = action.payload;
    },
    setAccountNumber: (state, action: PayloadAction<string>) => {
      state.accountNumber = action.payload;
    },
    setBvn: (state, action: PayloadAction<string>) => {
      state.bvn = action.payload;
    },
    setPayoutDetails: (state, action: PayloadAction<PayoutData>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPayoutData.pending, (state) => {
        state.networkStatus = 'loading';
      })
      .addCase(submitPayoutData.fulfilled, (state, action) => {
        state.isComplete = true;
        state.networkStatus = 'succeeded';
      })
      .addCase(submitPayoutData.rejected, (state, action) => {
        state.isComplete = false;
        state.networkStatus = 'failed';
        state.error = action.error.message || "An error occurred while submitting payout data.";
      });
  },
});

export const selectPayoutInformation = (store: any) =>
  store.PayoutData as PayoutData;
export const { resetState, setRentalPrice, setBankName, setAccountName, setAccountNumber, setBvn } = slice.actions;
export default slice.reducer;
