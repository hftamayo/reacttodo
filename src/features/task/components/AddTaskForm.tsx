import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { addTask } from '../../../shared/services/redux/slices/taskSlice';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';

import { taskBoard, toasterMessages } from '../../../shared/utils/twind/styles';
import { AddTaskProps } from '../../../shared/types/task.type';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'sonner';

export const AddTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskProps>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AddTaskProps> = (data) => {
    dispatch(addTask(data));
    reset();
  };

  const onError = (error: any) => {
    if (errors.name) {
      toast.error(errors.name.message, {
        className: toasterMessages.errorToaster,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={taskBoard.form}>
      <div className={taskBoard.frmContainer}>
        <Input
          type="text"
          ctrlsize="large"
          placeholder="Add a task"
          {...register('name', {
            required: 'Task name is required',
            minLength: {
              value: 5,
              message: 'Task name must be at least 5 characters',
            },
          })}
        />
        <Button variant="additive" size="lg" type="submit" title="Add a Task">
          <AiOutlinePlus size={30} />
        </Button>
      </div>
    </form>
  );
};
