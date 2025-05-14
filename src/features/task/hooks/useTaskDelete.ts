import { useTaskMutations } from './useTaskMutations';
import {
  showError,
  showSuccess,
} from '@/shared/services/notification/notificationService';

interface UseTaskDeleteProps {
  onSuccess?: () => void;
}

export const useTaskDelete = ({ onSuccess }: UseTaskDeleteProps = {}) => {
  const { deleteTask } = useTaskMutations();

  const handleDelete = async (id: number) => {
    try {
      await deleteTask.mutateAsync(id);
      showSuccess('Task deleted successfully');
      onSuccess?.();
      return true;
    } catch (error) {
      showError('Failed to delete task');
      return false;
    }
  };

  return {
    handleDelete,
    isDeleting: deleteTask.isPending,
  };
};
