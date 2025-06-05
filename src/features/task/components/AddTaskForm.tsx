import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { showError } from '@/shared/services/notification/notificationService';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { taskBoard } from '@/shared/utils/twind/styles';
import { AddTaskProps } from '@/shared/types/api.type';
import { AiOutlinePlus } from 'react-icons/ai';

interface AddTaskFormProps {
  onAddTask: (task: AddTaskProps) => Promise<void>;
  isAddingTask: boolean;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  isAddingTask,
}) => {
  const { text: addTaskButton } = useTranslation('addTaskButton');
  const { text: errorComponent = 'An error occurred' } =
    useTranslation('errorComponent');
  const { group } = useTranslation('addTaskForm');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskProps>();

  if (!group) {
    return null;
  }

  const onSubmit: SubmitHandler<AddTaskProps> = async (data) => {
    try {
      const TaskWithOwner = {
        ...data,
        owner: 1, // Replace with actual owner ID
      };
      //await addTask.mutateAsync(data);
      await onAddTask(TaskWithOwner);
      reset();
    } catch (error) {
      console.error('Error adding task:', error);
      showError('Failed to add task');
    }
  };

  const onError = (error: any) => {
    if (errors.title) {
      showError(errors.title.message ?? 'Validation error');
    } else {
      showError(error.message ?? 'Validation error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={taskBoard.form}
      aria-label="Add new task"
    >
      <div className={taskBoard.frmContainer}>
        <Input
          type="text"
          ctrlsize="large"
          placeholder={group.lblplaceholder}
          disabled={isAddingTask}
          aria-invalid={errors.title ? 'true' : 'false'}
          {...register('title', {
            required: `${group.lblregister}`,
            minLength: {
              value: 5,
              message: `${group.lblminLength}`,
            },
          })}
        />
        <Button
          variant="additive"
          size="lg"
          type="submit"
          title={addTaskButton}
          disabled={isAddingTask}
        >
          <AiOutlinePlus size={30} />
        </Button>
      </div>
    </form>
  );
};
