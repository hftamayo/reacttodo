import { createSlice } from '@reduxjs/toolkit';
import { TaskProps } from '../../../shared/types/api.type';

interface TaskUIState {
  selectedTaskId: number | null;
  viewMode: 'list' | 'grid';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TaskUIState = {
  selectedTaskId: null,
  viewMode: 'list',
  status: 'idle',
};

const taskSlice = createSlice({
  name: 'taskUI',
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
