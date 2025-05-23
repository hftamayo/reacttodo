import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskUIState {
  selectedTaskId: number | null;
  viewMode: 'list' | 'grid';
  lastOperation: {
    type: 'add' | 'update' | 'delete' | 'toggle' | null;
    taskId: number | null;
    timestamp: number | null;
  };
}

const initialState: TaskUIState = {
  selectedTaskId: null,
  viewMode: 'list',
  lastOperation: {
    type: null,
    taskId: null,
    timestamp: null,
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
  },
});

export const { setSelectedTask, setViewMode, setLastOperation } =
  taskSlice.actions;

export default taskSlice.reducer;
