import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskUIState {
  selectedTaskId: number | null;
  viewMode: 'list' | 'grid';
}

const initialState: TaskUIState = {
  selectedTaskId: null,
  viewMode: 'list',
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
  },
});

export const { setSelectedTask, setViewMode } =
  taskSlice.actions;

export default taskSlice.reducer;
