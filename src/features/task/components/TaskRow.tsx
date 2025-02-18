import React from 'react';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { TaskProps } from '../../../shared/types/api.type';
import { updateTask, deleteTask } from '../store/taskSlice';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';

import { taskRow } from '../../../shared/utils/twind/styles';

export const TaskRow: React.FC<TaskProps> = (task: TaskProps) => {
  const { text: deleteRowButton } = useTranslation('deleteRowButton');
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, done: !task.done }));
  };

  const handleDeleteTask = () => {
    if (task.id) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <li className={task.done ? taskRow.liComplete : taskRow.li}>
      <div className="flex">
        <Input
          type="checkbox"
          checked={task.done}
          onChange={handleToggleComplete}
        />
        <Label
          size="large"
          className={task.done ? taskRow.textComplete : taskRow.text}
          onClick={handleToggleComplete}
        >
          {task.title}
        </Label>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDeleteTask}
        title={deleteRowButton}
      >
        <FaRegTrashAlt />
      </Button>
    </li>
  );
};
