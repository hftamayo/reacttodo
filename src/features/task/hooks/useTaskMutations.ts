import { useMutation } from '@tanstack/react-query';
import { taskOps } from '@/shared/services/api/apiClient';
import { queryClient } from '@/shared/services/cache/queryClient';
import { taskKeys } from './queryKeys';
import {
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
} from '@/shared/types/api.type';

export const useTaskMutations = () => {
  // Add Task Mutation
  const addTask = useMutation({
    mutationFn: (newTask: AddTaskProps) => taskOps.addTask(newTask),
    onSuccess: () => {
      // Invalidate all task lists to reflect the new task
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });

  // Update Task Mutation
  const updateTask = useMutation({
    mutationFn: (task: TaskProps) => taskOps.updateTask(task),
    onSuccess: (data, variables) => {
      // Update the specific task in cache
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });

      // Invalidate lists that might contain this task
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });

  // Delete Task Mutation
  const deleteTask = useMutation({
    mutationFn: (id: number) => taskOps.deleteTask(id),
    onSuccess: (_, id) => {
      // Remove from cache immediately
      queryClient.removeQueries({
        queryKey: taskKeys.detail(id),
      });

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });

  // Toggle Task Done Mutation
  const toggleTaskDone = useMutation({
    mutationFn: (taskId: TaskIdentifier) => taskOps.toggleTaskDone(taskId),
    onSuccess: (_, taskId) => {
      // Invalidate the specific task
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(taskId.id),
      });

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
};
