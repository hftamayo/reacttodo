import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  TaskContext,
  TaskData,
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
  ApiResponse,
} from '@/shared/types/api.type';
import { showError } from '@/shared/services/notification/notificationService';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const addTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    AddTaskProps,
    TaskContext
  >({
    mutationFn: taskService.fetchAddTask,
    onMutate: async (newTask: AddTaskProps) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);
      if (previousTasks) {
        const tempId = Date.now();
        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: [
              ...previousTasks.data.tasks,
              {
                ...newTask,
                id: tempId,
                createdAt: new Date().toISOString(),
              } as TaskProps,
            ],
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
          task.id === updatedTask.id
            ? { ...updatedTask, updatedAt: new Date().toISOString() }
            : task
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

  const toggleTaskDone = useMutation<
    ApiResponse<TaskData>,
    Error,
    TaskIdentifier,
    TaskContext
  >({
    mutationFn: taskService.fetchToggleTaskDone,
    onMutate: async (taskId: TaskIdentifier) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);

      if (previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: previousTasks.data.tasks.map((task) =>
              task.id === taskId.id ? { ...task, done: !task.done } : task
            ),
          },
        });
      }

      return { previousTasks };
    },
    onError: (error, _, context) => {
      if (error) {
        showError(
          'Toggle task operation:',
          'Failed to toggle task completion status'
        );
      }
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    number,
    TaskContext
  >({
    mutationFn: taskService.fetchDeleteTask,
    onMutate: async (taskId: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>([
        'tasks',
      ]);

      if (previousTasks) {
        queryClient.setQueryData<ApiResponse<TaskData>>(['tasks'], {
          ...previousTasks,
          data: {
            ...previousTasks.data,
            tasks: previousTasks.data.tasks.filter(
              (task) => task.id !== taskId
            ),
          },
        });
      }

      return { previousTasks };
    },
    onError: (error, _, context) => {
      if (error) {
        showError('Delete task operation:', 'Failed to delete task');
      }
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    addTask,
    updateTask,
    toggleTaskDone,
    deleteTask,
  };
};
