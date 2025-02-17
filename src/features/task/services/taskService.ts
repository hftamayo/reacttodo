import { taskOps } from '@/shared/services/api/apiClient';
import {
  AddTaskProps,
  TaskProps,
  TaskData,
  ApiResponse,
} from '@/shared/types/api.type';

const fetchTasks = async (): Promise<ApiResponse<TaskData>> => {
  return taskOps.getTasks();
};

const fetchTask = async (id: string): Promise<ApiResponse<TaskData>> => {
  return taskOps.getTask(id);
};

const fetchAddTask = async (
  task: AddTaskProps
): Promise<ApiResponse<TaskData>> => {
  return taskOps.addTask(task);
};

const fetchUpdateTask = async (
  task: TaskProps
): Promise<ApiResponse<TaskData>> => {
  return taskOps.updateTask(task);
};

const fetchDeleteTask = async (id: string): Promise<ApiResponse<TaskData>> => {
  return taskOps.deleteTask(id);
};

export const taskService = {
  fetchTasks,
  fetchTask,
  fetchAddTask,
  fetchUpdateTask,
  fetchDeleteTask,
};
