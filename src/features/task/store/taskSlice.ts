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
import { getErrorMessage, showApiError } from '@/shared/utils/error/errorUtils';

// Update the RootState type to reflect the new tasks structure
export const getTotalTasks = (state: RootState) =>
  Object.keys(state.task.tasks).length;

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> = await taskService.fetchTasks();
      // Convert to object instead of Map
      const tasks = response.data.tasks
        ? response.data.tasks.reduce(
            (acc, task) => {
              if (task.id) {
                acc[task.id] = task;
              }
              return acc;
            },
            {} as Record<string, TaskProps>
          )
        : {};
      return tasks;
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      showApiError(error as ApiError, 'Failed to fetch tasks');
      return rejectWithValue(errorMessage);
    }
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> = await taskService.fetchTask(id);
      return response.data.task;
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      showApiError(error as ApiError, 'Failed to fetch task');
      return rejectWithValue(errorMessage);
    }
  }
);

export const addTask = createAsyncThunk(
  'task/addTask',
  async (task: AddTaskProps, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> =
        await taskService.fetchAddTask(task);
      return response.data.task;
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      showApiError(error as ApiError, 'Failed to add a task');
      return rejectWithValue(errorMessage);
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
      const errorMessage = getErrorMessage(error as ApiError);
      showApiError(error as ApiError, 'Failed to update a task');
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> =
        await taskService.fetchDeleteTask(id);
      return { id, msg: response.resultMessage };
    } catch (error) {
      const errorMessage = getErrorMessage(error as ApiError);
      showApiError(error as ApiError, 'Failed to delete a task');
      return rejectWithValue(errorMessage);
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
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        getTask.fulfilled,
        (state, action: PayloadAction<TaskProps | undefined>) => {
          state.status = 'succeeded';
          state.loading = false;
          state.task = action.payload ?? null;
        }
      )
      .addCase(getTask.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      })
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
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<{ id: string; msg: string }>) => {
          state.status = 'succeeded';
          state.loading = false;
          // Use delete operator instead of Map.delete
          delete state.tasks[action.payload.id];
          state.error = action.payload.msg;
        }
      )
      .addCase(deleteTask.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
