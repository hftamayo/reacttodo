import { useTaskMutations } from './useTaskMutations';
import {
  showError,
  showSuccess,
} from '@/shared/services/notification/notificationService';

export const useTaskOperations = () => {
  const { deleteTask, toggleTaskDone } = useTaskMutations();

  const handleToggle = async (id: number) => {
    try {
      await toggleTaskDone.mutateAsync({ id });
      showSuccess('Task status updated');
      return true;
    } catch (error) {
      console.error('Error updating task status:', error);
      showError('Failed to update task status');
      return false;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask.mutateAsync(id);
      showSuccess('Task deleted successfully');
      return true;
    } catch (error) {
      console.error('Error updating task status:', error);
      showError('Failed to delete task');
      return false;
    }
  };

  return {
    handleToggle,
    handleDelete,
    isToggling: toggleTaskDone.isPending,
    isDeleting: deleteTask.isPending,
  };
};
