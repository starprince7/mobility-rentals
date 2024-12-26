/* Auth Reducer file */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

// Import helpers
import { signInWithCredentials } from "@/helpers/auth";
import api from "@/helpers/api";

// Import types
import { CredentialsSignUpData, GoogleSignUpData } from "@/types/auth";
import { SignInData } from "@/types/auth";
import { IUser } from "@/types/user";
import toastService from "@/lib/toast-alert";

interface IAuthState {
  user: null | IUser;
  error: string;
  isLoggedIn: boolean;
  authRequestStatus: "idle" | "loading" | "succeeded" | "failed";
  validationError: {
    validationError: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

// ************************  Async Start **************************
// 1.
export const signUpWithCredentials = createAsyncThunk<
  any,
  CredentialsSignUpData
>(
  "auth/signUpWithCredentials",
  async (signUpData) => await api.signUpWithCredentials(signUpData)
);

// 2.
export const signInWithCredentialAction = createAsyncThunk<any, SignInData>(
  "auth/signInWithCredential",
  async (signInData) => await signInWithCredentials({ ...signInData })
);

// 3.
export const signUpWithGoogle = createAsyncThunk<any, GoogleSignUpData>(
  "auth/signUpWithGoogle",
  async (signUpData) => {
    if (!signUpData)
      return toastService.showErrorMessage("OAuth: Empty profile information.");
    return await api.signUpWithGoogle(signUpData);
  }
);
// ************************ Async End. ***************************

const initialState: IAuthState = {
  user: null,
  error: "",
  isLoggedIn: false,
  authRequestStatus: "idle",
  validationError: {
    validationError: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutAction: (state) => {
      state.isLoggedIn = false;
      state.authRequestStatus = "idle";
      state.error = "";
      state.user = null;
      state.validationError = {
        validationError: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
      signOut();
    },
    signInAction: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.authRequestStatus = "idle";
      state.error = "";
      state.user = action.payload as any;
      state.validationError = {
        validationError: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
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
      toastService.showErrorMessage(action.error.message!);
    });
    builder.addCase(signUpWithCredentials.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.authRequestStatus = "failed";
        state.validationError = action.payload?.validationError;
        if (action.payload?.validationError.email) {
          toastService.showErrorMessage(action.payload?.validationError.email);
          return;
        }
        toastService.showErrorMessage(
          "A validation error occurred while creating your account."
        );
      } else {
        state.authRequestStatus = "succeeded";
        state.isLoggedIn = false;
        state.user = action.payload.user;
        toastService.showSuccessMessage(action.payload.message);
      }
    });
    // ************* Sign IN Actions for Credentials
    builder.addCase(signInWithCredentialAction.pending, (state, action) => {
      state.authRequestStatus = "loading";
    });
    builder.addCase(signInWithCredentialAction.rejected, (state, action) => {
      (state.authRequestStatus = "failed"),
        (state.error = action.error.message!);
      toastService.showErrorMessage(action.error.message!);
    });
    builder.addCase(signInWithCredentialAction.fulfilled, (state, action) => {
      if (action.payload?.error) {
        (state.authRequestStatus = "failed"), (state.isLoggedIn = false);
        state.error = action.payload?.error;
        toastService.showErrorMessage(action.payload?.error);
      } else {
        (state.authRequestStatus = "succeeded"), (state.isLoggedIn = true);
        state.user = action.payload;
      }
    });
    // ************* Sign UP Actions for Google Sign up.
    builder.addCase(signUpWithGoogle.pending, (state) => {
      state.authRequestStatus = "loading";
    });
    builder.addCase(signUpWithGoogle.rejected, (state, action) => {
      (state.authRequestStatus = "failed"),
        (state.error = action.error.message!);
      toastService.showErrorMessage(action.error.message!);
    });
    builder.addCase(signUpWithGoogle.fulfilled, (state, action) => {
      (state.authRequestStatus = "succeeded"), (state.isLoggedIn = true);
      state.user = action.payload.user;
    });
  },
});

const authReducer = slice.reducer;
export const { signOutAction, signInAction } = slice.actions;
export default authReducer;

// selector
export const selectAuth = (store: any) => store.auth as IAuthState;
