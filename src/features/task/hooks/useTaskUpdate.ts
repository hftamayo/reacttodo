import { useForm } from 'react-hook-form';
import { TaskProps } from '@/shared/types/api.type';
import { useTaskMutations } from './useTaskMutations';
import {
  showError,
  showSuccess,
} from '@/shared/services/notification/notificationService';

interface UseUpdateTaskProps {
  initialData: TaskProps;
  onSuccess?: () => void;
}

export const useTaskUpdate = ({
  initialData,
  onSuccess,
}: UseUpdateTaskProps) => {
  const { updateTask } = useTaskMutations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskProps>({
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: TaskProps) => {
    try {
      await updateTask.mutateAsync(data);
      onSuccess?.();
      showSuccess('Task updated successfully');
      return true;
    } catch (error) {
      showError('Failed to update task');
      return false;
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: updateTask.isPending,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  };
};
