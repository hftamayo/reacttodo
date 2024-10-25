import React, { FC } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Label from '../../../shared/components/ui/Label';
import Input from '../../../shared/components/ui/Input';
import Button from '../../../shared/components/ui/Button';
import { TaskProps } from '../../../shared/types/task.type';
import { taskRow } from '../../../shared/utils/twind/styles';

const TaskRow: FC<TaskProps> = ({ todo, toggleComplete, deleteTask }) => {
  return (
    <li className={todo.completed ? taskRow.liComplete : taskRow.li}>
      <div className="flex">
        <Input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo)}
        />
        <Label
          className={todo.completed ? taskRow.textComplete : taskRow.text}
          onClick={() => toggleComplete(todo)}
        >
          {todo.text}
        </Label>
      </div>
      <Button onClick={() => deleteTask(todo.id)}>
        <FaRegTrashAlt />
      </Button>
    </li>
  );
};

export default TaskRow;
