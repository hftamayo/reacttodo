import { useForm } from 'react-hook-form';
import { TaskProps } from '@/shared/types/api.type';
import { useTaskMutations } from './useTaskMutations';
import { showSuccess } from '@/shared/services/notification/notificationService';

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
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<TaskProps>({
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: TaskProps) => {
    try {
      // Only send fields that have changed
      const updateData: Partial<TaskProps> = {
        id: data.id, // Always include ID
      };

      // Only include fields that have changed
      if (dirtyFields.title) updateData.title = data.title;
      if (dirtyFields.description) updateData.description = data.description;
      if (dirtyFields.done) updateData.done = data.done;
      if (dirtyFields.owner) updateData.owner = data.owner;

      // Use the mutation which handles cache invalidation internally
      await updateTask.mutateAsync(updateData as TaskProps);

      // Only show success here - error handling happens in the mutation
      showSuccess('Task updated successfully');
      onSuccess?.();
      return true;
    } catch (error) {
      // We only need minimal error handling here since the mutation will show errors
      console.error('Form submission error:', error);
      return false;
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    isDirty,
    errors,
    isSubmitting: updateTask.isPending,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  };
};
