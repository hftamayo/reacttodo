import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskOps } from '@/shared/services/api/apiClient';
import { taskKeys } from './queryKeys';
import { optUpdates } from '@/shared/services/cache/optUpdates';
import {
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
} from '@/shared/types/api.type';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  // Add Task Mutation
  const addTask = useMutation({
    mutationFn: (newTask: AddTaskProps) => taskOps.addTask(newTask),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
      return optUpdates.optimisticAddTask(queryClient, newTask);
    },
    onSettled: () => {
      // Invalidate all task lists to reflect the new task
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });

  // Update Task Mutation
  const updateTask = useMutation({
    mutationFn: (task: TaskProps) => taskOps.updateTask(task),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({
        queryKey: taskKeys.detail(updatedTask.id),
      });
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
      return optUpdates.optimisticUpdateTask(queryClient, updatedTask);
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });

  // Toggle Task Done Mutation
  const toggleTaskDone = useMutation({
    mutationFn: (taskId: TaskIdentifier) => taskOps.toggleTaskDone(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(taskId.id) });
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
      return optUpdates.optimisticToggleTask(queryClient, taskId);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });

  // Delete Task Mutation
  const deleteTask = useMutation({
    mutationFn: (id: number) => taskOps.deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
      return optUpdates.optimisticDeleteTask(queryClient, id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
};
