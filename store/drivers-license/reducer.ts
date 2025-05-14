import apiClient from "@/config/api";
import { prepareImageForUpload } from "@/utils";
import getFileExtension from "@/utils/get-file-extension";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const HOST_URL = 'http://localhost:3000/api' // process.env.EXPO_PUBLIC_APP_API_URL // 'http://localhost:3000/api'

type MediaAsset = {
  assetId: string;
  base64: string | null;
  duration: number | null;
  exif: any | null;
  fileName: string;
  fileSize: number;
  height: number;
  type: 'image' | 'video'; // assuming it could also be 'video'
  uri: string;
  width: number;
};

interface DriverLicense {
  frontImage: MediaAsset | null;
  backImage: MediaAsset | null;
  isComplete: boolean
  error: string;
  networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

// Async
type SubmitParams = {
  frontImage: DriverLicense['frontImage'];
  backImage: DriverLicense['backImage'];
};

export const submitDriversLicense = createAsyncThunk<any, SubmitParams>(
  "drivers_license/submitDriversLicense",
  async ({ frontImage, backImage }) => {
    if (!frontImage) throw new Error("Missing `frontImage` value.");
    if (!backImage) throw new Error("Missing `backImage` value.");

    const formData = new FormData();

    // Prepare images for upload
    const frontImageFile = prepareImageForUpload(frontImage);
    const backImageFile = prepareImageForUpload(backImage);

    // Append to form data with appropriate names that match the backend endpoint
    formData.append("frontImage", frontImageFile as any);
    formData.append("backImage", backImageFile as any);

    // Add asset IDs as additional fields if needed
    formData.append("frontImageAssetId", frontImage.assetId);
    formData.append("backImageAssetId", backImage.assetId);

    try {
      const response = await apiClient.post(`${HOST_URL}/user/drivers-license`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',  // Very important
          // Authorization: `Bearer ${auth_token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error submitting driver\'s license:', error);
      throw error;
    }
  }
);

const initialState: DriverLicense = {
  frontImage: null,
  backImage: null,
  isComplete: false,
  error: '',
  networkStatus: 'idle'
};

const slice = createSlice({
  name: "drivers_license",
  initialState,
  reducers: {
    resetDriversLicense: (state) => {
      state.frontImage = null;
      state.backImage = null;
      state.isComplete = false;
    },
    setFrontImage: (state, action: PayloadAction<DriverLicense['frontImage']>) => {
      state.frontImage = action.payload;
      state.isComplete = Boolean(state.frontImage && state.backImage);
    },
    setBackImage: (state, action: PayloadAction<DriverLicense['backImage']>) => {
      state.backImage = action.payload;
      state.isComplete = Boolean(state.frontImage && state.backImage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDriversLicense.pending, (state) => {
        state.networkStatus = 'loading';
      })
    builder
      .addCase(submitDriversLicense.fulfilled, (state) => {
        state.isComplete = true;
        state.networkStatus = 'succeeded';
      })
      .addCase(submitDriversLicense.rejected, (state) => {
        state.networkStatus = 'failed';
        state.error = '';
      });
  },
});

export const selectDriversLicense = (store: any) =>
  store.DriverLicense as DriverLicense;
export const { setBackImage, setFrontImage, resetDriversLicense } = slice.actions;
export default slice.reducer;