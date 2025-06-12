import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskProps } from '@/shared/types/api.type';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { UseUpdateTaskProps } from '@/shared/types/task/task.type';

export const useTaskUpdate = ({
  initialData,
  onSuccess,
  onUpdateTask,
}: UseUpdateTaskProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<TaskProps>({
    defaultValues: initialData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      // Only include fields that have changed
      const changedFields = Object.keys(dirtyFields).reduce((acc, key) => {
        const value = data[key as keyof TaskProps];
        if (value !== null && value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      }, {} as Partial<TaskProps>);

      // Ensure ID is included for the update operation
      const taskToUpdate = {
        ...initialData,
        ...changedFields,
      };

      // Call the provided callback instead of a direct mutation
      await onUpdateTask(taskToUpdate);

      // Only show success here - error handling happens in the mutation
      showSuccess('Task updated successfully');
      onSuccess?.();
      return true;
    } catch (error) {
      // We only need minimal error handling here since the mutation will show errors
      console.error('Form submission error:', error);
      return false;
    }
  });

  return {
    register,
    handleSubmit,
    reset,
    isDirty,
    errors,
    isSubmitting: isSubmitting,
    handleFormSubmit,
  };
};
