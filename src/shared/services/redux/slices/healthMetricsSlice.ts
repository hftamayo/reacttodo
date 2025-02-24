import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import { beOps } from '../../api/apiClient';

const initialState: HealthMetrics = {
  lastCheckTime: Date.now(),
  failureCount: 0,
  averageResponseTime: 0,
  responseTime: 0,
};

export const fetchHealthMetrics = createAsyncThunk(
  'healthMetrics/fetchHealthMetrics',
  async () => {
    const response = await beOps.appHealth();
    const endTime = performance.now();
    const responseTime =
      endTime - (response.data.healthCheck.details?.startTime ?? 0);
    return {
      lastCheckTime: Date.now(),
      failureCount: 0,
      averageResponseTime: responseTime,
      responseTime,
    };
  }
);

const healthMetricsSlice = createSlice({
  name: 'healthMetrics',
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<HealthMetrics>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHealthMetrics.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setMetrics } = healthMetricsSlice.actions;
export default healthMetricsSlice.reducer;
