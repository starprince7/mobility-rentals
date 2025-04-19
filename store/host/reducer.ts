import apiClient from "@/config/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const HOST_URL = process.env.EXPO_PUBLIC_APP_API_URL // 'http://localhost:3000/api'

interface Goal {
    id: string
    label: string
}

interface HostStore {
    isComplete: boolean
    error: string;
    goalOptions: Goal[];
    selectedGoals: string[];
    networkStatus?: "idle" | "loading" | "succeeded" | "failed";
}

export const submitHostGoals = createAsyncThunk<any, string>(
    "host/submitHostGoals",
    async (goals) => {
        return apiClient.post(`${HOST_URL}/user/host-goals`, { hostGoals: goals })
    }
);

const initialState: HostStore = {
    isComplete: false,
    error: '',
    selectedGoals: [],
    networkStatus: 'idle',
    goalOptions: [
        { id: "earnings", label: "Earn extra income" },
        { id: "offset", label: "Offset vehicle costs" },
        { id: "unused", label: "Make use of an idle vehicle" },
        { id: "community", label: "Help others in my community" },
        { id: "business", label: "Grow my vehicle rental business" },
    ]
};

const slice = createSlice({
    name: "host",
    initialState,
    reducers: {
        resetHost: (state) => {
            state.selectedGoals = [];
            state.error = '';
            state.isComplete = false;
            state.networkStatus = 'idle'
        },
        setSelectedGoals: (state, action: PayloadAction<HostStore['selectedGoals']>) => {
            state.selectedGoals = action.payload
            state.isComplete = Boolean(state.selectedGoals.length > 0);
        },
        setGoalOptions: (state, action: PayloadAction<HostStore['goalOptions']>) => {
            state.goalOptions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitHostGoals.pending, (state) => {
                state.networkStatus = 'loading';
            })
        builder
            .addCase(submitHostGoals.fulfilled, (state) => {
                state.isComplete = true;
                state.networkStatus = 'succeeded';
            })
            .addCase(submitHostGoals.rejected, (state) => {
                state.networkStatus = 'failed';
                state.error = '';
            });
    },
});

export const selectHost = (store: any) =>
    store.Host as HostStore;
export const { setGoalOptions, resetHost, setSelectedGoals } = slice.actions;
export default slice.reducer;