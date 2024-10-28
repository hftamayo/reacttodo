import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '../../utils/envvars';

const fetchTasks = async () => {
  const response = await fetch(`${BACKEND_URL}/tasks/all`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchTask = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchAddTask = async (task: any) => {
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

const fetchUpdateTask = async (task: any) => {
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

const fetchDeleteTask = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetTasks = () => {
  return useQuery('tasks', fetchTasks);
};

export const useGetTask = (id: string) => {
  return useQuery(['task', id], () => fetchTask(id));
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchAddTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchDeleteTask, {
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
