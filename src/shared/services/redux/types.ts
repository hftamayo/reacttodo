import { RootState } from './rootReducer';

// Extract state types from RootState
export type TaskUIState = RootState['taskUI'];
export type TaskState = RootState['task'];
export type SettingsState = RootState['settings'];
export type HealthMetricsState = RootState['healthMetrics'];
export type MenuState = RootState['menu'];

// Type for the last operation in TaskUI
export type TaskOperationType = TaskUIState['lastOperation']['type'];
