import { combineReducers } from '@reduxjs/toolkit';
import taskUIReducer from '../../../features/task/store/taskSlice';
import paginationReducer from '../../../features/task/store/paginationSlice';
import settingsReducer from '../../../features/settings/store/settingsSlice';
import healthMetricsReducer from '../../../features/healthcheck/store/healthMetricsSlice';
import menuReducer from '../../../features/dashboard/components/menu/store/menuSlice';

export const rootReducer = combineReducers({
  taskUI: taskUIReducer,
  pagination: paginationReducer,
  settings: settingsReducer,
  healthMetrics: healthMetricsReducer,
  menu: menuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
