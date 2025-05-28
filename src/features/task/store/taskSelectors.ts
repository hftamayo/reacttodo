import { RootState } from '@/shared/services/redux/rootReducer';
import { TaskUIState } from '@/shared/services/redux/types';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectTaskUI = (state: RootState): TaskUIState => state.taskUI;
export const selectViewMode = (state: RootState) => state.taskUI.viewMode;
export const selectSelectedTaskId = (state: RootState) =>
  state.taskUI.selectedTaskId;

