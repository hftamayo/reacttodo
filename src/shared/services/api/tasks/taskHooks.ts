import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from './taskService';
import { TaskProps, TaskResponse } from '../../../types/task.type';

const useGetTasks = () => {
  return useQuery<TaskProps[], Error>('tasks', taskService.fetchTasks);
};

const useGetTask = (id: string) => {
  return useQuery<TaskProps, Error>(['task', id], () =>
    taskService.fetchTask(id)
  );
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskProps, Error, TaskProps>(taskService.fetchAddTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskProps, Error, TaskProps>(taskService.fetchUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskResponse, Error, string>(taskService.fetchDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const taskHooks = {
  useGetTasks,
  useGetTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
};
