import React from 'react';
import { useAppDispatch } from '../../../shared/services/redux/storeHooks';
import { TaskProps } from '../../../shared/types/task.type';
import {
  updateTask,
  deleteTask,
} from '../../../shared/services/redux/taskSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/forms/label';
import { Input } from '@/shared/components/ui/forms/input';
import { Button } from '@/shared/components/ui/forms/button';

import { taskRow } from '../../../shared/utils/twind/styles';

const TaskRow: React.FC<TaskProps> = (task: TaskProps) => {
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, complete: !task.complete }));
  };

  const handleDeleteTask = () => {
    if (task.id) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <li className={task.complete ? taskRow.liComplete : taskRow.li}>
      <div className="flex">
        <Input
          type="checkbox"
          checked={task.complete}
          onChange={handleToggleComplete}
        />
        <Label
          size="large"
          className={task.complete ? taskRow.textComplete : taskRow.text}
          onClick={handleToggleComplete}
        >
          {task.name}
        </Label>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDeleteTask}
        title="Delete a Record"
      >
        <FaRegTrashAlt />
      </Button>
    </li>
  );
};

export default TaskRow;
