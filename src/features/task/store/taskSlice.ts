import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TaskProps,
  AddTaskProps,
  TaskData,
  ApiResponse,
  ApiError,
} from '../../../shared/types/api.type';
import { RootState } from '../../../shared/services/redux/rootReducer';
import { taskService } from '../services/taskService';
import { showError } from '@/shared/services/notification/notificationService';

// Update the RootState type to reflect the new tasks structure
export const getTotalTasks = (state: RootState) =>
  Object.keys(state.task.tasks).length;

export const addTask = createAsyncThunk(
  'task/addTask',
  async (task: AddTaskProps, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> =
        await taskService.fetchAddTask(task);
      return response.data.task;
    } catch (error) {
      showError(error as ApiError, 'Failed to fetch tasks');
      return rejectWithValue((error as ApiError).resultMessage);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: TaskProps, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> =
        await taskService.fetchUpdateTask(task);
      return response.data.task;
    } catch (error) {
      showError(error as ApiError, 'Failed to fetch tasks');
      return rejectWithValue((error as ApiError).resultMessage);
    }
  }
);

// Update TasksState interface to use Record instead of Map
interface UpdatedTasksState {
  tasks: Record<string, TaskProps>;
  task: TaskProps | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
  msg: string | null;
}

const initialState: UpdatedTasksState = {
  // Use object instead of Map
  tasks: {},
  task: null,
  status: 'idle',
  loading: false,
  error: null,
  msg: null,
};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        addTask.fulfilled,
        (state, action: PayloadAction<TaskProps | undefined>) => {
          state.status = 'succeeded';
          state.loading = false;
          if (action.payload?.id) {
            // Use object notation instead of Map.set
            state.tasks[action.payload.id] = action.payload;
          }
        }
      )
      .addCase(addTask.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        updateTask.fulfilled,
        (state, action: PayloadAction<TaskProps | undefined>) => {
          state.loading = false;
          state.status = 'succeeded';
          if (action.payload?.id) {
            // Use object notation instead of Map.set
            state.tasks[action.payload.id] = action.payload;
          }
        }
      )
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
