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

export const getRole = createAsyncThunk(
  'role/getRole',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: RoleResponse = await roleOps.getRole(id);
      return response.role;
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
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleComplete, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
