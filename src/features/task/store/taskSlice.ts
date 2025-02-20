import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TaskProps,
  AddTaskProps,
  TaskData,
  ApiResponse,
  TasksState,
  ApiError,
} from '../../../shared/types/api.type';
import { RootState } from '../../../shared/services/redux/rootReducer';
import { taskService } from '../services/taskService';
import { getErrorMessage, showApiError } from '@/shared/utils/error/errorUtils';

export const getTotalTasks = (state: RootState) => state.task.tasks.size;

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<TaskData> = await taskService.fetchTasks();
      const tasks = response.data.tasks
        ? new Map(response.data.tasks.map((task) => [task.id!, task]))
        : new Map();
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

const initialState: TasksState = {
  tasks: new Map<string, TaskProps>(),
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
            state.tasks.set(action.payload.id, action.payload);
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
            state.tasks.set(action.payload.id, action.payload);
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
          state.tasks.delete(action.payload.id);
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
