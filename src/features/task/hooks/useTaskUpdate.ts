import { useForm } from 'react-hook-form';
import { TaskProps } from '@/shared/types/api.type';
import { useTaskMutations } from './useTaskMutations';
import { showError } from '@/shared/services/notification/notificationService';

interface UseUpdateTaskProps {
  initialData: TaskProps;
}

export const useTaskUpdate = ({ initialData }: UseUpdateTaskProps) => {
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
