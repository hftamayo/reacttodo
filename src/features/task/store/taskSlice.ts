import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskProps } from '@/shared/types/api.type';

interface TaskUIState {
  selectedTaskId: number | null;
  viewMode: 'list' | 'grid';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  lastOperation: {
    type: 'add' | 'update' | 'delete' | 'toggle' | null;
    taskId: number | null;
    timestamp: number | null;
  };
  optimisticUpdates: {
    [key: number]: TaskProps;
  };
  taskStats: {
    total: number;
    completed: number;
  };
}

const initialState: TaskUIState = {
  selectedTaskId: null,
  viewMode: 'list',
  status: 'idle',
  lastOperation: {
    type: null,
    taskId: null,
    timestamp: null,
  },
  optimisticUpdates: {},
  taskStats: {
    total: 0,
    completed: 0,
  },
};

const taskSlice = createSlice({
  name: 'taskUI',
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<number | null>) => {
      state.selectedTaskId = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
      state.viewMode = action.payload;
    },
    setStatus: (state, action: PayloadAction<TaskUIState['status']>) => {
      state.status = action.payload;
    },
    setLastOperation: (
      state,
      action: PayloadAction<{
        type: TaskUIState['lastOperation']['type'];
        taskId: number | null;
      }>
    ) => {
      state.lastOperation = {
        ...action.payload,
        timestamp: Date.now(),
      };
    },
    setOptimisticUpdate: (
      state,
      action: PayloadAction<{ taskId: number; task: TaskProps }>
    ) => {
      state.optimisticUpdates[action.payload.taskId] = action.payload.task;
    },
    clearOptimisticUpdate: (state, action: PayloadAction<number>) => {
      delete state.optimisticUpdates[action.payload];
    },
    clearAllOptimisticUpdates: (state) => {
      state.optimisticUpdates = {};
    },
    updateTaskStats: (
      state,
      action: PayloadAction<{ total: number; completed: number }>
    ) => {
      state.taskStats = action.payload;
    },
    incrementTaskCount: (state) => {
      state.taskStats.total += 1;
    },
    decrementTaskCount: (state) => {
      state.taskStats.total -= 1;
    },
    incrementCompletedCount: (state) => {
      state.taskStats.completed += 1;
    },
    decrementCompletedCount: (state) => {
      state.taskStats.completed -= 1;
    },
  },
});

export const {
  setSelectedTask,
  setViewMode,
  setStatus,
  setLastOperation,
  setOptimisticUpdate,
  clearOptimisticUpdate,
  clearAllOptimisticUpdates,
  updateTaskStats,
  incrementTaskCount,
  decrementTaskCount,
  incrementCompletedCount,
  decrementCompletedCount,
} = taskSlice.actions;

export default taskSlice.reducer;
