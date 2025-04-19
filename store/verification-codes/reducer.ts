import apiClient from "@/config/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const HOST_URL = process.env.EXPO_PUBLIC_APP_API_URL

interface VerificationCodes {
    verificationCode: string;
    isComplete: boolean
    error: ''
    networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

// Submit the email verification code to the server.
export const postEmailVerificationCode = createAsyncThunk<any, string>(
    "verificationCodes/postEmailVerificationCode",
    async (verificationCode) => {
        if (!verificationCode) return alert("Pass a `verificationCode` to the redux action.");
        // alert("Making API request!")
        return await apiClient.post(`${HOST_URL}/auth/validate-verification-code`, {
            verificationCode,
        });
    }
);

// Submit the mobile-phone verification code to the server.
export const submitMobileVerificationCode = createAsyncThunk<any, string>(
    "verificationCodes/submitMobileVerificationCode",
    async (verificationCode) => {
        if (!verificationCode) return alert("Pass a `verificationCode` to the redux action.");
        // alert("Making API request!")
        return await apiClient.post(`${HOST_URL}/auth/validate-verification-code`, {
            verificationCode,
        });
    }
);

const initialState: VerificationCodes = {
    isComplete: false,
    verificationCode: "",
    error: '',
    networkStatus: "idle",
};

const slice = createSlice({
    name: "verificationCodes",
    initialState,
    reducers: {
        resetVerificationCode: (state) => {
            state.verificationCode = "";
        },
        setVerificationCode: (state, action: PayloadAction<string>) => {
            // console.log('Reducer file: ', action.payload)
            state.verificationCode = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handle submission of email verification code.
        builder
            .addCase(postEmailVerificationCode.pending, (state) => {
                state.networkStatus = "loading";
            })
            .addCase(postEmailVerificationCode.fulfilled, (state, action) => {
                if (action.payload?.data?.error) {
                    state.error = action.payload?.data?.error
                    state.networkStatus = "failed";
                    return
                }
                state.verificationCode = '';
                state.networkStatus = "succeeded";
            })
            .addCase(postEmailVerificationCode.rejected, (state) => {
                state.networkStatus = "failed";
            });
        // Handle the submission of mobile-number verification code.
        builder
            .addCase(submitMobileVerificationCode.pending, (state) => {
                state.networkStatus = "loading";
            })
            .addCase(submitMobileVerificationCode.fulfilled, (state, action) => {
                if (action.payload?.data?.error) {
                    state.error = action.payload?.data?.error
                    state.networkStatus = "failed";
                    return
                }
                state.verificationCode = '';
                state.isComplete = true
                state.networkStatus = "succeeded";
            })
            .addCase(submitMobileVerificationCode.rejected, (state) => {
                state.networkStatus = "failed";
            });
    }
});

export const selectVerificationCodes = (store: any) =>
    store.VerificationCodes as VerificationCodes;
export const { resetVerificationCode, setVerificationCode } = slice.actions;
export default slice.reducer;
