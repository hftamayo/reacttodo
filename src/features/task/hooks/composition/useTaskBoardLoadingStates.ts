import { useTaskBoardMutations } from '../core/useTaskBoardMutations';

export const useTaskBoardLoadingStates = () => {
  const { addTask, updateTask, deleteTask, toggleTaskDone } = useTaskBoardMutations();

  return {
    isAdding: addTask.isPending,
    isUpdating: updateTask.isPending,
    isToggling: toggleTaskDone.isPending,
    isDeleting: deleteTask.isPending,
  };
}; 