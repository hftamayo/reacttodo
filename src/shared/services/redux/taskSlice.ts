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
});

export default tasksSlice.reducer;
