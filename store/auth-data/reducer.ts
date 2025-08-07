/* Auth Reducer file */
import * as authApi from "@/http/auth";
import { StorageService } from "@/services";
import { IUser, SignInData, SignUpData } from "@/types/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import types

interface IAuth {
  phone: string;
  user: null | IUser;
  isAuthenticated: boolean;
  authRequestStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// ************************  Async Start **************************
// 1.
export const signUpWithCredentials = createAsyncThunk<
  any,
  SignUpData
>(
  "auth/signUpWithCredentials",
  async (signUpData) => await authApi.signUpWithCredentials(signUpData)
);

// 2.
export const signInWithCredentials = createAsyncThunk<any, SignInData>(
  "auth/signInWithCredential",
  async (signInData) => {
    const { data } = await authApi.signInWithCredentials(signInData)
    return data
  }
);

// ************************ Async End. ***************************

const initialState: IAuth = {
  phone: "",
  user: {
    id: '',
    firstName: '',
    lastName: '',
    role: 'renter',
    email: '',
    accountStatus: 'pending',
    accountWallet: 0,
    phoneNumber: ''
  },
  error: "",
  isAuthenticated: false,
  authRequestStatus: "idle",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    signOutAction: (state) => {
      state.isAuthenticated = false;
      state.authRequestStatus = "idle";
      state.error = "";
      state.user = null;
    },
    signInAction: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.authRequestStatus = "idle";
      state.error = "";
      state.user = action.payload as any;
    },
    clearError: (state) => {
      state.error = "";
      state.authRequestStatus = "idle";
    },
  },
  extraReducers(builder) {
    // ******** Sign UP Actions for Credentials.
    builder.addCase(signUpWithCredentials.pending, (state) => {
      state.authRequestStatus = "loading";
    });
    builder.addCase(signUpWithCredentials.rejected, (state, action) => {
      state.authRequestStatus = "failed";
      state.error = action.error.message!;
    });
    builder.addCase(signUpWithCredentials.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.authRequestStatus = "failed";
      } else {
        state.authRequestStatus = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = "";
      }
    });
    // ************* Sign IN Actions for Credentials
    builder.addCase(signInWithCredentials.pending, (state, action) => {
      state.authRequestStatus = "loading";
    });
    builder.addCase(signInWithCredentials.rejected, (state, action) => {
      (state.authRequestStatus = "failed"),
        (state.error = action.error.message!);
    });
    builder.addCase(signInWithCredentials.fulfilled, (state, action) => {
      if (action.payload?.error) {
        (state.authRequestStatus = "failed"), (state.isAuthenticated = false);
        state.error = action.payload?.error;
      } else {
        (state.authRequestStatus = "succeeded"), (state.isAuthenticated = true);
        StorageService.setAuthToken(action.payload.token)
        state.user = action.payload.user;
      }
    });

  },
});

const authReducer = slice.reducer;
export const { signOutAction, signInAction, setPhone, clearError } = slice.actions;
export default authReducer;

// selector
export const selectAuth = (store: any) => store.Auth as IAuth;
