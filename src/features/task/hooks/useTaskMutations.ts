import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  TaskContext,
  TaskData,
  TaskProps,
  ApiResponse,
} from '@/shared/types/api.type';
import { showError } from '@/shared/services/notification/notificationService';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const addTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    TaskProps,
    TaskContext
  >({
    mutationFn: taskService.fetchAddTask,
    onMutate: async (newTask: TaskProps) => {
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
    onError: (error, _newTask, context) => {
      if (error) {
        showError(
          'Add task operation:',
          'An error occurred while adding the task.'
        );
      }
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

  const updateTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    TaskProps,
    TaskContext
  >({
    mutationFn: taskService.fetchUpdateTask,
    onMutate: async (updatedTask: TaskProps) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);

      if (previousTasks) {
        const updatedTasks = previousTasks.data.tasks.map((task: TaskProps) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: updatedTasks,
          },
        });
      }
      return { previousTasks };
    },
    onError: (error, _updatedTask, context) => {
      if (error) {
        showError(
          'Add task operation:',
          'An error occurred while adding the task.'
        );
      }
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

  const deleteTask = useMutation<ApiResponse<TaskData>, Error, string>({
    mutationFn: taskService.fetchDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    addTask,
    updateTask,
    deleteTask,
  };
};
