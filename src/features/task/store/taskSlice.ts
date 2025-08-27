import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskUIState {
  selectedTaskId: number | null;
  viewMode: 'list' | 'grid';
  page: number;
  limit: number;
}

const initialState: TaskUIState = {
  selectedTaskId: null,
  viewMode: 'list',
  page: 1,
  limit: 5, // Default, can be set from env if needed
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const { setSelectedTask, setViewMode, setPage, setLimit } =
  taskSlice.actions;

// Selectors
export const selectPage = (state: any) => state.taskUI.page;
export const selectLimit = (state: any) => state.taskUI.limit;

export default taskSlice.reducer;
