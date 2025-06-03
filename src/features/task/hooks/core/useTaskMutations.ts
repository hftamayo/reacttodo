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

      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      //console.log('addTask: cache invalidated successfully');
      //console.log('attempting to refetch task list');
      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        // Add cache-busting timestamp
        const timestamp = Date.now();
        const freshData = await taskOps.getTasks({
          ...paginationParams,
          delay: timestamp, // Cache-busting parameter
        });

        queryClient.setQueryData(taskKeys.list(paginationParams), freshData);

        //console.log('Task data refreshed successfully:', freshData);
        //console.log('forcing component to re-render with new data');
        await queryClient.refetchQueries({
          queryKey: taskKeys.list(paginationParams),
          exact: true,
        });
      } catch (error) {
        console.error('Error refreshing task data:', error);
      }
    },
    onError: (error) => {
      showError('Failed to add task');
      console.error('Add task error:', error);
    },
  });

  // Update Task Mutation
  const updateTask = useMutation({
    mutationFn: (task: TaskProps) => taskOps.updateTask(task),
    onSuccess: () => {
      showSuccess('Task updated successfully');

      console.log(
        'Active queries before invalidation:',
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => JSON.stringify(q.queryKey))
      );

      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      console.log('updateTask: cache invalidated successfully');

      console.log(
        'Active queries before invalidation:',
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => JSON.stringify(q.queryKey))
      );
    },
    onError: (error) => {
      showError('Failed to update task');
      console.error('Update task error:', error);
    },
  });

  // Toggle Task Done Mutation
  const toggleTaskDone = useMutation({
    mutationFn: (taskId: TaskIdentifier) => taskOps.toggleTaskDone(taskId),
    onSuccess: () => {
      showSuccess('Task status updated successfully');

      console.log(
        'Active queries before invalidation:',
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => JSON.stringify(q.queryKey))
      );

      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      console.log('toggleTaskDone: cache invalidated successfully');

      // Log the exact query key we're trying to refetch
      const exactQueryKey = taskKeys.list(paginationParams);
      console.log(
        'Attempting to refetch query with key:',
        JSON.stringify(exactQueryKey)
      );

      queryClient
        .refetchQueries({
          queryKey: exactQueryKey,
          exact: true,
        })
        .then(() => {
          console.log('Refetch promise resolved');
        })
        .catch((err) => {
          console.error('Refetch error:', err);
        });
    },
    onError: (error) => {
      showError('Failed to update task status');
      console.error('Toggle task error:', error);
    },
  });

  // Delete Task Mutation
  const deleteTask = useMutation({
    mutationFn: (id: number) => taskOps.deleteTask(id),
    onSuccess: () => {
      showSuccess('Task deleted successfully');

      console.log(
        'Active queries before invalidation:',
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => JSON.stringify(q.queryKey))
      );

      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      console.log('deleteTask: cache invalidated successfully');

      // Log the exact query key we're trying to refetch
      const exactQueryKey = taskKeys.list(paginationParams);
      console.log(
        'Attempting to refetch query with key:',
        JSON.stringify(exactQueryKey)
      );

      queryClient
        .refetchQueries({
          queryKey: exactQueryKey,
          exact: true,
        })
        .then(() => {
          console.log('Refetch promise resolved');
        })
        .catch((err) => {
          console.error('Refetch error:', err);
        });
    },
    onError: (error) => {
      showError('Failed to delete task');
      console.error('Delete task error:', error);
    },
  });

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
};
