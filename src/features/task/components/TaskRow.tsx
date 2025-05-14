import React, { memo } from 'react';
import { TaskProps } from '../../../shared/types/api.type';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { taskRow } from '../../../shared/utils/twind/styles';

interface TaskRowProps extends TaskProps {
  onEdit: (task: TaskProps) => void;
}

export const TaskRow: React.FC<TaskRowProps> = memo(
  ({
    id,
    title,
    description,
    done,
    owner,
    createdAt,
    updatedAt,
    deletedAt,
    onEdit,
  }) => {
    const { text: deleteRowButton } = useTranslation('deleteRowButton');
    const { text: updateRowButton } = useTranslation('updateRowButton');
    const { handleToggle, handleDelete, isToggling, isDeleting } =
      useTaskOperations();

    const handleToggleComplete = async () => {
      if (!id) return;
      await handleToggle(id);
    };

    const handleUpdateTask = () => {
      if (!id) return;
      onEdit({ id, title, description, done, owner });
    };

    const handleDeleteTask = async () => {
      if (!id) return;
      await handleDelete(id);
    };

    return (
      <li
        className={done ? taskRow.liComplete : taskRow.li}
        data-testid={`task-row-${id}`}
      >
        <div className={taskRow.content}>
          <Input
            type="checkbox"
            checked={done}
            onChange={handleToggleComplete}
            disabled={isToggling}
            aria-label={`Mark "${title}" as ${done ? 'incomplete' : 'complete'}`}
          />
          <Label
            size="large"
            className={done ? taskRow.textComplete : taskRow.text}
            onClick={handleToggleComplete}
          >
            {title}
          </Label>
        </div>
        <div className={taskRow.actions}>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteTask}
            title={deleteRowButton}
            disabled={isDeleting}
            aria-label={`Delete task "${title}"`}
          >
            <FaRegTrashAlt />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUpdateTask}
            title={updateRowButton}
            disabled={done}
            aria-label={`Edit task "${title}" ${done ? '(disabled - task completed)' : ''}`}
          >
            <FaPencilAlt />
          </Button>
        </div>
      </li>
    );
  }
);

TaskRow.displayName = 'TaskRow';
