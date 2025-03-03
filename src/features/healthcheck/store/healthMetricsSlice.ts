import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HealthMetrics, HealthStatus } from '@/shared/types/healthcheck.type';
import { healthService } from '../services/HealthService';

const initialState: HealthMetrics = {
  lastCheckTime: Date.now(),
  failureCount: 0,
  averageResponseTime: 0,
  responseTime: 0,
  status: 'CHECKING',
  isOnline: navigator.onLine,
};

export const fetchHealthMetrics = createAsyncThunk(
  'healthMetrics/fetchHealthMetrics',
  async () => {
    await healthService.checkHealth();
    return healthService.getMetrics();
  }
);

const healthMetricsSlice = createSlice({
  name: 'healthMetrics',
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<HealthMetrics>) {
      return action.payload;
    },
    updateStatus(state, action: PayloadAction<HealthStatus>) {
      state.status = action.payload;
      state.lastCheckTime = Date.now();
    },
    updateNetworkStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
      if (!action.payload) {
        state.status = 'NO_CONNECTION';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthMetrics.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchHealthMetrics.rejected, (state) => {
        state.failureCount += 1;
        state.status = 'NO_CONNECTION';
        state.lastCheckTime = Date.now();
      });
  },
});

export const { setMetrics, updateStatus, updateNetworkStatus } =
  healthMetricsSlice.actions;
export default healthMetricsSlice.reducer;
