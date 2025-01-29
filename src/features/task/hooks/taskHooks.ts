import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from './taskService';
import {
  TaskContext,
  TaskProps,
  TaskResponse,
} from '../../../shared/types/task.type';

const useGetTasks = (enabled: boolean) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['tasks'],
    queryFn: taskService.fetchTasks,
    enabled,
  });
};

const useGetTask = (id: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchTask(id),
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, Error, TaskProps, TaskContext>({
    mutationFn: taskService.fetchAddTask,
    onMutate: async (newTask: TaskProps) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<TaskResponse>(['tasks']);
      if (previousTasks) {
        queryClient.setQueryData<TaskResponse>(['tasks'], {
          ...previousTasks,
          tasks: [...previousTasks.tasks, newTask],
        });
      }
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<TaskResponse>(
          ['tasks'],
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, Error, TaskProps, TaskContext>({
    mutationFn: taskService.fetchUpdateTask,
    onMutate: async (updatedTask: TaskProps) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<TaskResponse>(['tasks']);
      if (previousTasks) {
        queryClient.setQueryData<TaskResponse>(['tasks'], {
          ...previousTasks,
          tasks: [...previousTasks.tasks, updatedTask],
        });
      }
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<TaskResponse>(
          ['tasks'],
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const useDeleteTask = (id: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchDeleteTask(id),
  });
};

export const taskHooks = {
  useGetTasks,
  useGetTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
};
