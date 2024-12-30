import { fetchVehicleDetail } from "@/hooks";
import { IAvailableVehicles } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IVehicleDetail {
  vehicleDetail: IAvailableVehicles | null;
  networkRequestStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: IVehicleDetail = {
  vehicleDetail: null,
  error: "",
  networkRequestStatus: "idle",
};

// Async
type FetchParams = {
  id: number;
};
export const fetchIntoStoreVehicleDetail = createAsyncThunk<any, FetchParams>(
  "vehicleInfoSlice/fetchIntoStoreVehicleDetail",
  async ({ id }) => {
    if (!id) return alert("Missing vehicle value `id`.");
    return await fetchVehicleDetail(id);
  }
);

const slice = createSlice({
  name: "vehicleInfoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIntoStoreVehicleDetail.pending, (state) => {
      state.networkRequestStatus = "loading";
    });
    builder.addCase(fetchIntoStoreVehicleDetail.rejected, (state, action) => {
      (state.networkRequestStatus = "failed"),
        (state.error = action.error.message!);
      alert(action.error.message!);
    });
    builder.addCase(fetchIntoStoreVehicleDetail.fulfilled, (state, action) => {
      (state.networkRequestStatus = "succeeded"),
        (state.vehicleDetail = action.payload);
    });
  },
});

export const selectVehicleDetail = (store: any) =>
  store.VehicleDetail as IVehicleDetail;
export const {  } = slice.actions;
export default slice.reducer;
