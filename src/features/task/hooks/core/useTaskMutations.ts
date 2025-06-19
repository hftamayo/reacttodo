import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskOps } from '@/shared/services/api/apiClient';
import { taskKeys } from './queryKeys';
import { AddTaskProps, TaskProps } from '@/shared/types/domains/task.type';
import { PaginationParams } from '@/shared/types/api.type';
import { useCrudStatus } from '@/shared/hooks/error/useCrudStatus';

export const useTaskMutations = (paginationParams: PaginationParams) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useCrudStatus('task');

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
    } catch (error) {
      console.error('Error refreshing task data:', error);
    }
  };

  // Add Task Mutation
  const addTask = useMutation({
    mutationFn: (newTask: AddTaskProps) => taskOps.addTask(newTask),
    onSuccess: async () => {
      handleSuccess('create');
      await refreshTasksAfterMutation();
    },
    onError: (error: Error) => {
      handleError('create', error);
    },
  });

  // Update Task Mutation
  const updateTask = useMutation({
    mutationFn: (task: TaskProps) => taskOps.updateTask(task),
    onSuccess: async () => {
      handleSuccess('update');
      await refreshTasksAfterMutation();
    },
    onError: (error: Error) => {
      handleError('update', error);
    },
  });

  // Toggle Task Done Mutation
  const toggleTaskDone = useMutation({
    mutationFn: (taskId: number) => taskOps.toggleTaskDone(taskId),
    onSuccess: async () => {
      handleSuccess('toggle');
      await refreshTasksAfterMutation();
    },
    onError: (error: Error) => {
      handleError('toggle', error);
    },
  });

  // Delete Task Mutation
  const deleteTask = useMutation({
    mutationFn: (id: number) => taskOps.deleteTask(id),
    onSuccess: async () => {
      handleSuccess('delete');
      await refreshTasksAfterMutation();
    },
    onError: (error: Error) => {
      handleError('delete', error);
    },
  });

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
};
