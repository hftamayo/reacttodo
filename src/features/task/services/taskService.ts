import { BACKEND_URL } from '@/shared/utils/envvars';
import { taskOps } from '@/shared/services/api/apiClient';
import {
  AddTaskProps,
  TaskProps,
  TaskResponse,
} from '@/shared/types/task.type';

const fetchTasks = async (): Promise<TaskResponse> => {
  return taskOps.getTasks();
};

const fetchTask = async (id: string): Promise<TaskResponse> => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchAddTask = async (task: AddTaskProps): Promise<TaskResponse> => {
  const response = await fetch(`${BACKEND_URL}/tasks/task`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchUpdateTask = async (task: TaskProps): Promise<TaskResponse> => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${task.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchDeleteTask = async (id: string): Promise<TaskResponse> => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('No response received');
  }
  return response.json();
};

export const taskService = {
  fetchTasks,
  fetchTask,
  fetchAddTask,
  fetchUpdateTask,
  fetchDeleteTask,
};
