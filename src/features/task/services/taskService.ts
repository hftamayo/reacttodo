import { BACKEND_URL } from '@/shared/utils/envvars';
import { taskOps } from '@/shared/services/api/apiClient';
import {
  AddTaskProps,
  TaskProps,
  TaskData,
  ApiResponse,
} from '@/shared/types/api.type';

const fetchTasks = async (): Promise<ApiResponse<TaskData> | undefined> => {
  return taskOps.getTasks();
};

const fetchTask = async (
  id: string
): Promise<ApiResponse<TaskData> | undefined> => {
  return taskOps.getTask(id);
};

const fetchAddTask = async (
  task: AddTaskProps
): Promise<ApiResponse<TaskData> | undefined> => {
  return taskOps.addTask(task);
};

const fetchUpdateTask = async (
  task: TaskProps
): Promise<ApiResponse<TaskData> | undefined> => {
  return taskOps.updateTask(task);
};

const fetchDeleteTask = async (
  id: string
): Promise<ApiResponse<TaskData> | undefined> => {
  return taskOps.deleteTask(id);
};

export const taskService = {
  fetchTasks,
  fetchTask,
  fetchAddTask,
  fetchUpdateTask,
  fetchDeleteTask,
};
