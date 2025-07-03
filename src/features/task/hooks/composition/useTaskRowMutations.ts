import { useCallback } from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { useTaskMutations } from '../core/useTaskMutations';
import { PaginationParams } from '@/shared/types/api.type';

// Accepts the task and pagination params (if needed)
export const useTaskRowMutations = (
  task: TaskProps,
  paginationParams: PaginationParams
) => {
  const { updateTask, deleteTask, toggleTaskDone } =
    useTaskMutations(paginationParams);

  // Handler for toggling task completion
  const handleToggle = useCallback(async () => {
    await toggleTaskDone.mutateAsync(task.id);
  }, [toggleTaskDone, task.id]);

  // Handler for deleting the task
  const handleDelete = useCallback(async () => {
    await deleteTask.mutateAsync(task.id);
  }, [deleteTask, task.id]);

  // Handler for editing the task (delegates to parent handler)
  const handleUpdate = useCallback(async () => {
    await updateTask.mutateAsync(task);
  }, [updateTask, task]);

  return {
    onToggle: handleToggle,
    onDelete: handleDelete,
    onUpdate: handleUpdate,
    isToggling: toggleTaskDone.isPending,
    isDeleting: deleteTask.isPending,
  };
};
