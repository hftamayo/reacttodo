import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../../../features/task/store/taskSlice';
import taskUIReducer from '../../../features/task/store/taskSlice';
import settingsReducer from '../../../features/settings/store/settingsSlice';
import healthMetricsReducer from '../../../features/healthcheck/store/healthMetricsSlice';
import menuReducer from '../../../features/dashboard/components/menu/store/menuSlice';

export const rootReducer = combineReducers({
  task: taskReducer,
  taskUI: taskUIReducer,
  settings: settingsReducer,
  healthMetrics: healthMetricsReducer,
  menu: menuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
