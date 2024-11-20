import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../shared/services/redux/storeHooks';
import { addTask } from '../../../shared/services/redux/taskSlice';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

import { taskBoard } from '../../../shared/utils/twind/styles';
import { AddTaskProps } from '../../../shared/types/task.type';
import { AiOutlinePlus } from 'react-icons/ai';

const AddTaskForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<AddTaskProps>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AddTaskProps> = (data) => {
    dispatch(addTask(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={taskBoard.form}>
      <div className={taskBoard.frmContainer}>
        <Input
          type="text"
          ctrlsize="large"
          placeholder="Add a task"
          {...register('name', { required: true })}
        />
        <Button variant="additive" size="lg" type="submit">
          <AiOutlinePlus size={30} />
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
