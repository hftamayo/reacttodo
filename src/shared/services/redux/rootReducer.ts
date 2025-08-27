import { combineReducers } from '@reduxjs/toolkit';
import taskUIReducer from '../../../features/task/store/taskSlice';
import settingsReducer from '../../../features/settings/store/settingsSlice';
import healthMetricsReducer from '../../../features/healthcheck/store/healthMetricsSlice';
import menuReducer from '../../../features/dashboard/components/menu/store/menuSlice';
import modalReducer from './slices/modalSlice';

export const rootReducer = combineReducers({
  taskUI: taskUIReducer,
  settings: settingsReducer,
  healthMetrics: healthMetricsReducer,
  menu: menuReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
