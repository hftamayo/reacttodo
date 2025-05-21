import { RootState } from '@/shared/services/redux/rootReducer';
import { TaskUIState, TaskOperationType } from '@/shared/services/redux/types';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectTaskUI = (state: RootState): TaskUIState => state.taskUI;
export const selectOptimisticUpdates = (state: RootState) => state.taskUI.optimisticUpdates;
export const selectLastOperation = (state: RootState) => state.taskUI.lastOperation;
export const selectViewMode = (state: RootState) => state.taskUI.viewMode;
export const selectSelectedTaskId = (state: RootState) => state.taskUI.selectedTaskId;

// Memoized selectors using createSelector
export const selectIsTaskOptimistic = (taskId: number) =>
  createSelector(
    [selectOptimisticUpdates],
    (optimisticUpdates) => !!optimisticUpdates[taskId]
  );

export const selectLastOperationType = createSelector(
  [selectLastOperation],
  (lastOperation) => lastOperation.type
);

export const selectIsOperationInProgress = createSelector(
  [selectLastOperation],
  (lastOperation) => {
    if (!lastOperation.timestamp) return false;
    const now = Date.now();
    return now - lastOperation.timestamp < 2000; // 2 seconds threshold
  }
);

// Selector to get task with optimistic updates
export const selectTaskWithOptimisticUpdates = (taskId: number) =>
  createSelector(
    [selectOptimisticUpdates],
    (optimisticUpdates) => optimisticUpdates[taskId]
  ); 