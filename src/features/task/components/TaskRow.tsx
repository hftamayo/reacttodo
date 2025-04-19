import React from 'react';
import { TaskProps } from '../../../shared/types/api.type';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';

import { taskRow } from '../../../shared/utils/twind/styles';

interface TaskRowProps extends TaskProps {
  mutations: ReturnType<typeof useTaskMutations>;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  id,
  title,
  description,
  done,
  owner,
  createdAt,
  updatedAt,
  deletedAt,
  mutations,
}) => {
  const { text: deleteRowButton } = useTranslation('deleteRowButton');
  const { deleteTask, updateTask } = mutations;

  const handleToggleComplete = () => {
    updateTask.mutate({
      id,
      title,
      description,
      done: !done,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
    });
  };

  const handleDeleteTask = () => {
    if (id) {
      deleteTask.mutate(id);
    }
  };

  return (
    <li className={done ? taskRow.liComplete : taskRow.li}>
      <div className="flex">
        <Input type="checkbox" checked={done} onChange={handleToggleComplete} />
        <Label
          size="large"
          className={done ? taskRow.textComplete : taskRow.text}
          onClick={handleToggleComplete}
        >
          {title}
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
