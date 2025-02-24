import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthMetrics } from '@/shared/types/healthcheck.type';

const initialState: HealthMetrics = {
  lastCheckTime: Date.now(),
  failureCount: 0,
  averageResponseTime: 0,
  responseTime: 0,
};

const healthMetricsSlice = createSlice({
  name: 'healthMetrics',
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<HealthMetrics>) {
      return action.payload;
    },
  },
});

export const { setMetrics } = healthMetricsSlice.actions;
export default healthMetricsSlice.reducer;
