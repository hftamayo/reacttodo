import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../../../features/task/store/taskSlice';
import settingsReducer from '../../../features/settings/store/settingsSlice';
import healthMetricsReducer from '../../../features/healthcheck/store/healthMetricsSlice';

export const rootReducer = combineReducers({
  task: taskReducer,
  settings: settingsReducer,
  healthMetrics: healthMetricsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
