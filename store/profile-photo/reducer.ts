import apiClient from "@/config/api";
import { MediaAsset } from "@/types/files";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
const HOST_URL = 'http://localhost:3000/api' // process.env.EXPO_PUBLIC_APP_API_URL

interface ProfileImageStore {
  image: MediaAsset | null;
  isComplete: boolean;
  error: string | undefined;
  networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

export const submitProfileImage = createAsyncThunk<any, ProfileImageStore['image']>(
  "profile_photo/submitProfileImage",
  async (image) => {
    if (!image) return alert("Pass an `image` to the redux action.");

    try {
      // Create FormData instance
      const formData = new FormData();

      // Getting file extension from URI or fileName
      let fileExtension = 'jpg'; // Default fallback
      if (image.fileName) {
        const parts = image.fileName.split('.');
        if (parts.length > 1) {
          fileExtension = parts[parts.length - 1];
        }
      } else if (image.uri) {
        const parts = image.uri.split('.');
        if (parts.length > 1) {
          fileExtension = parts[parts.length - 1];
        }
      }

      // Make sure the mime type is correct
      const mimeType = image.type || `image/${fileExtension}`;

      // Prepare the image object for FormData
      const imageFile = {
        uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        name: image.fileName || `profile_image.${fileExtension}`,
        type: mimeType
      };

      console.log('Preparing image for upload:', {
        uri: imageFile.uri.substring(0, 50) + '...',  // Truncate for logs
        name: imageFile.name,
        type: imageFile.type
      });

      // Append the image to FormData with the key 'image'
      formData.append('image', imageFile as any);

      // Add additional metadata if needed
      if (image.assetId) formData.append('assetId', image.assetId);

      // Send the FormData to the API using fetch
      const response = await apiClient.post(`${HOST_URL}/upload-profile-photo`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',  // Very important
          // Authorization: `Bearer ${auth_token}`
        }
      });
      console.log('Upload successful:', response.data);
      return response;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
);
const initialState: ProfileImageStore = {
  error: '',
  image: null,
  isComplete: false,
  networkStatus: 'idle'
};

const slice = createSlice({
  name: "profile_photo",
  initialState,
  reducers: {
    resetProfileImage: (state) => {
      state.error = "";
      state.image = null;
      state.isComplete = false;
      state.networkStatus = 'idle';
    },
    setImage: (state, action: PayloadAction<ProfileImageStore['image']>) => {
      state.image = action.payload;
    },
  },
  extraReducers(builder) {
    // Handle profile photo submission
    builder.addCase(submitProfileImage.pending, (state) => {
      state.networkStatus = 'loading'
    })
      .addCase(submitProfileImage.rejected, (state, action) => {
        state.networkStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(submitProfileImage.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error
          state.networkStatus = 'failed'
        }
        state.networkStatus = 'succeeded',
          state.isComplete = true
      })
  }
});

export const selectProfileImageStore = (store: any) =>
  store.ProfileImageStore as ProfileImageStore;
export const { resetProfileImage, setImage } = slice.actions;
export default slice.reducer;