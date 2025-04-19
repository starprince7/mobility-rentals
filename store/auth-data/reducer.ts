/* Auth Reducer file */
import * as authApi from "@/http/auth";
import { IUser, SignInData, SignUpData } from "@/types/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import types

interface IAuth {
  phone: string;
  user: null | IUser;
  isLoggedIn: boolean;
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
  async (signInData) => await authApi.signInWithCredentials({ ...signInData })
);

// ************************ Async End. ***************************

const initialState: IAuth = {
  phone: "",
  user: null,
  error: "",
  isLoggedIn: false,
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
    },
    signInAction: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.authRequestStatus = "idle";
      state.error = "";
      state.user = action.payload as any;
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
        state.isLoggedIn = true;
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
        (state.authRequestStatus = "failed"), (state.isLoggedIn = false);
        state.error = action.payload?.error;
      } else {
        (state.authRequestStatus = "succeeded"), (state.isLoggedIn = true);
        state.user = action.payload;
      }
    });

  },
});

const authReducer = slice.reducer;
export const { signOutAction, signInAction, setPhone } = slice.actions;
export default authReducer;

// selector
export const selectAuth = (store: any) => store.auth as IAuth;
