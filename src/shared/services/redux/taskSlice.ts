import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TaskProps,
  AddTaskProps,
  TaskResponse,
  TasksState,
  ApiError,
} from '../../types/task.type';
import { RootState } from './rootSlice';
import { taskService } from '../api/tasks/taskService';

export const getTotalTasks = (state: RootState) => state.task.tasks.length;

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: TaskResponse = await taskService.fetchTasks();
      const tasks = response.tasks ? [...response.tasks].reverse() : [];
      return tasks;
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.resultMessage
          : 'An unknown error occurred. Please check your network connection and try again.'
      );
    }
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: TaskResponse = await taskService.fetchTask(id);
      return response.task;
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.resultMessage
          : 'An unknown error occurred. Please check your network connection and try again.'
      );
    }
  }
);

export const addTask = createAsyncThunk(
  'task/addTask',
  async (task: AddTaskProps, { rejectWithValue }) => {
    try {
      const response: TaskResponse = await taskService.fetchAddTask(task);
      return response.task;
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.resultMessage
          : 'An unknown error occurred. Please check your network connection and try again.'
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: TaskProps, { rejectWithValue }) => {
    try {
      const response: TaskResponse = await taskService.fetchUpdateTask(task);
      return response.task;
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.resultMessage
          : 'An unknown error occurred. Please check your network connection and try again.'
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: TaskResponse = await taskService.fetchDeleteTask(id);
      return response.task;
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.resultMessage
          : 'An unknown error occurred. Please check your network connection and try again.'
      );
    }
  }
);

const initialState: TasksState = {
  tasks: [],
  task: null,
  status: 'idle',
  loading: false,
  error: null,
  msg: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
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
        state.tasks = (
          Array.isArray(action.payload) ? action.payload : [action.payload]).filter((task) : task is TaskProps => task != undefined);
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
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = '
});

export default tasksSlice.reducer;
