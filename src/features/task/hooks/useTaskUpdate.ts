import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
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

      await updateTask.mutateAsync(updateData as TaskProps);
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
      onSuccess?.();
      showSuccess('Task updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      showError('Failed to update task');
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
