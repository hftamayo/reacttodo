import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskOps } from '@/shared/services/api/apiClient';
import { taskKeys } from './queryKeys';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import {
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
  PaginationParams,
} from '@/shared/types/api.type';

export const useTaskMutations = (paginationParams: PaginationParams) => {
  const queryClient = useQueryClient();

  // Add Task Mutation
  const addTask = useMutation({
    mutationFn: (newTask: AddTaskProps) => taskOps.addTask(newTask),
    onSuccess: async () => {
      showSuccess('Task added successfully');
      await refreshTasksAfterMutation();
    },
  });

  // Update Task Mutation
  const updateTask = useMutation({
    mutationFn: (task: TaskProps) => taskOps.updateTask(task),
    onSuccess: async () => {
      showSuccess('Task updated successfully');
      await refreshTasksAfterMutation();
    },
  });

  // Toggle Task Done Mutation
  const toggleTaskDone = useMutation({
    mutationFn: (taskId: TaskIdentifier) => taskOps.toggleTaskDone(taskId),
    onSuccess: async () => {
      showSuccess('Task status updated successfully');
      await refreshTasksAfterMutation();
    },
  });

  // Delete Task Mutation
  const deleteTask = useMutation({
    mutationFn: (id: number) => taskOps.deleteTask(id),
    onSuccess: async () => {
      showSuccess('Task deleted successfully');
      await refreshTasksAfterMutation();
    },
  });

  const refreshTasksAfterMutation = async () => {
    queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const timestamp = Date.now();
      const freshData = await taskOps.getTasks({
        ...paginationParams,
        _t: timestamp,
      });
      queryClient.setQueryData(taskKeys.list(paginationParams), freshData);
      await queryClient.refetchQueries({
        queryKey: taskKeys.list(paginationParams),
        exact: true,
      });
      return true;
    } catch (error) {
      showError('Failed to refresh task data');
      console.error('Error refreshing task data:', error);
      return false;
    }
  };

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
};
