import apiClient from "@/config/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the safety standards interface
interface AcceptSafetyStandards {
  agreesToMaintenanceRequirements: boolean
  agreesToSafetyInspection: boolean
  agreesToCleanlinessStandards: boolean
  agreesToInsuranceRequirements: boolean
  agreesToDrivingRecordCheck: boolean
  isComplete: boolean
  networkError: string;
  networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

const HOST_URL = 'http://localhost:3000/api' // process.env.EXPO_PUBLIC_APP_API_URL

export const submitSafetyStandards = createAsyncThunk<any, AcceptSafetyStandards>(
  "acceptSafetyStandards/submitSafetyStandards",
  async (acceptedStandards) => {
    const {
      agreesToCleanlinessStandards,
      agreesToDrivingRecordCheck,
      agreesToInsuranceRequirements,
      agreesToMaintenanceRequirements,
      agreesToSafetyInspection
    } = acceptedStandards;

    const requestPayload = {
      agreesToCleanlinessStandards,
      agreesToDrivingRecordCheck,
      agreesToInsuranceRequirements,
      agreesToMaintenanceRequirements,
      agreesToSafetyInspection
    }
    return apiClient.post(`${HOST_URL}/user/safety-standards`, { acceptedSafetyStandards: requestPayload })
  }
);

const initialState: AcceptSafetyStandards = {
  agreesToCleanlinessStandards: false,
  agreesToDrivingRecordCheck: false,
  agreesToInsuranceRequirements: false,
  agreesToMaintenanceRequirements: false,
  agreesToSafetyInspection: false,
  isComplete: false,
  networkError: '',
  networkStatus: "idle"
};

const slice = createSlice({
  name: "acceptSafetyStandards",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setAgreesToMaintenanceRequirements: (state, action: PayloadAction<boolean>) => {
      state.agreesToMaintenanceRequirements = action.payload;
    },
    setAgreesToSafetyInspection: (state, action: PayloadAction<boolean>) => {
      state.agreesToSafetyInspection = action.payload;
    },
    setAgreesToCleanlinessStandards: (state, action: PayloadAction<boolean>) => {
      state.agreesToCleanlinessStandards = action.payload;
    },
    setAgreesToInsuranceRequirements: (state, action: PayloadAction<boolean>) => {
      state.agreesToInsuranceRequirements = action.payload;
    },
    setAgreesToDrivingRecordCheck: (state, action: PayloadAction<boolean>) => {
      state.agreesToDrivingRecordCheck = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSafetyStandards.pending, (state) => {
        state.networkStatus = "loading";
      })
      .addCase(submitSafetyStandards.fulfilled, (state, action) => {
        state.networkStatus = "succeeded";
        state.isComplete = true;
      })
      .addCase(submitSafetyStandards.rejected, (state, action) => {
        state.networkStatus = "failed";
        state.networkError = action.error.message || 'An error occurred';
      });
  },
});

export const selectSafetyStandards = (store: any) =>
  store.AcceptSafetyStandards as AcceptSafetyStandards;
export const { setAgreesToMaintenanceRequirements, setAgreesToSafetyInspection, setAgreesToCleanlinessStandards, setAgreesToInsuranceRequirements, setAgreesToDrivingRecordCheck } = slice.actions;
export default slice.reducer;
