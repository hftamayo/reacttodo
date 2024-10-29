import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '../../utils/envvars';
import { TaskProps, TaskResponse } from '../../types/task.type';

const fetchTasks = async (): Promise<TaskProps[]> => {
  const response = await fetch(`${BACKEND_URL}/tasks/all`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchTask = async (id: string): Promise<TaskProps> => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchAddTask = async (task: TaskProps): Promise<TaskProps> => {
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

const fetchUpdateTask = async (task: TaskProps): Promise<TaskProps> => {
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

//defining hooks
export const useGetTasks = () => {
  return useQuery<TaskProps[], Error>('tasks', fetchTasks);
};

export const useGetTask = (id: string) => {
  return useQuery<TaskProps, Error>(['task', id], () => fetchTask(id));
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskProps, Error, TaskProps>(fetchAddTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskProps, Error, TaskProps>(fetchUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskResponse, Error, string>(fetchDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const taskOps = {
  fetchTasks,
  fetchTask,
  fetchAddTask,
  fetchUpdateTask,
  fetchDeleteTask,
  useGetTasks,
  useGetTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
};
