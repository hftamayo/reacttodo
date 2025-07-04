import { useCallback } from 'react';
import { TaskProps, AddTaskProps } from '@/shared/types/domains/task.type';
import { useTaskMutations } from '../core/useTaskBoardMutations';
import { PaginationParams } from '@/shared/types/api.type';

// Accepts the task and pagination params (if needed)
export const useTaskBoardMutations = (
  task: TaskProps,
  paginationParams: PaginationParams
) => {
  const { addTask, updateTask, deleteTask, toggleTaskDone } =
    useTaskMutations(paginationParams);

  // Handler for adding a new task
  const handleAddTask = useCallback(async (newTask: AddTaskProps) => {
    await addTask.mutateAsync(newTask);
  }, [addTask]);

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
    onAddTask: handleAddTask,
    onToggle: handleToggle,
    onDelete: handleDelete,
    onUpdate: handleUpdate,
    isAdding: addTask.isPending,
    isToggling: toggleTaskDone.isPending,
    isDeleting: deleteTask.isPending,
  };
};
