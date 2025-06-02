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
    onSuccess: () => {
      showSuccess('Task added successfully');
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
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
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
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
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
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
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
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
