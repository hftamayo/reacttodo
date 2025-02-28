import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { showError } from '@/shared/services/notification/notificationService';
import { addTask } from '../store/taskSlice';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { taskBoard } from '@/shared/utils/twind/styles';
import { AddTaskProps } from '@/shared/types/api.type';
import { AiOutlinePlus } from 'react-icons/ai';

export const AddTaskForm: React.FC = () => {
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
  const dispatch = useAppDispatch();

  if (!group) {
    return null;
  }

  const onSubmit: SubmitHandler<AddTaskProps> = (data) => {
    dispatch(addTask(data));
    reset();
  };

  const onError = (error: any) => {
    if (errors.title) {
      showError(errors.title.message ?? 'Validation error');
    } else {
      showError(error.message || 'Validation error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={taskBoard.form}>
      <div className={taskBoard.frmContainer}>
        <Input
          type="text"
          ctrlsize="large"
          placeholder={group.lblplaceholder}
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
        >
          <AiOutlinePlus size={30} />
        </Button>
      </div>
    </form>
  );
};
