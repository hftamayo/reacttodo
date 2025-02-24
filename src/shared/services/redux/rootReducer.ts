import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../../../features/task/store/taskSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';
import healthMetricsReducer from './slices/healthMetricsSlice';

export const rootReducer = combineReducers({
  task: taskReducer,
  theme: themeReducer,
  language: languageReducer,
  healthMetrics: healthMetricsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
