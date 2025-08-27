import { RootState } from './rootReducer';

// Only export types for slices that exist in rootReducer
export type TaskUIState = RootState['taskUI'];
export type SettingsState = RootState['settings'];

// If you need HealthMetricsState or MenuState elsewhere, move those types to their respective slice files.
// Remove TaskState and TaskOperationType as 'task' and 'lastOperation' do not exist in the current rootReducer.
