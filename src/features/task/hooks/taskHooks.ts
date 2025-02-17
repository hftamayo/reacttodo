import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  TaskContext,
  TaskData,
  TaskProps,
  ApiResponse,
} from '../../../shared/types/api.type';

const useGetTasks = (enabled: boolean) => {
  return useQuery<ApiResponse<TaskData>, Error>({
    queryKey: ['tasks'],
    queryFn: taskService.fetchTasks,
    enabled,
  });
};

const useGetTask = (id: string) => {
  return useQuery<ApiResponse<TaskData>, Error>({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchTask(id),
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TaskData>, Error, TaskProps, TaskContext>({
    mutationFn: taskService.fetchAddTask,
    onMutate: async (newTask: TaskProps): Promise<TaskContext> => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);
      if (previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: [...previousTasks.data.tasks, newTask],
          },
        });
      }
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(
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

  return useMutation<ApiResponse<TaskData>, Error, TaskProps, TaskContext>({
    mutationFn: taskService.fetchUpdateTask,
    onMutate: async (updatedTask: TaskProps) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);
      if (previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: [...previousTasks.data.tasks, updatedTask],
          },
        });
      }
      return { previousTasks };
    },

    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(
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
  return useQuery<ApiResponse<TaskData>, Error>({
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
