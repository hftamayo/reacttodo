import React, { useState } from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { taskRow } from '../../../../shared/utils/twind/styles';
import { DeleteDialog } from '@/shared/components/dialogs/DeleteDialog';
import { useTaskBoardActions } from '../../hooks/composition/useTaskBoardActions';

interface TaskRowProps extends TaskProps {}

const TaskRowComponent: React.FC<TaskRowProps> = ({
  id,
  title,
  description,
  done,
  owner,
}) => {
  // Calculate classes
  const liClass = done ? taskRow.liComplete : taskRow.li;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { text: deleteRowButton } = useTranslation('deleteRowButton');
  const { text: updateRowButton } = useTranslation('updateRowButton');

  // Use the new hook for mutation handlers and states
  const { onToggle, onDelete, onUpdate, isToggling, isDeleting } =
    useTaskBoardActions({ id, title, description, done, owner });

  const handleDeleteTask = async () => {
    await onDelete();
    setIsDialogOpen(false);
  };

  return (
    <li className={liClass} data-testid={`task-row-${id}`}>
      <div className={taskRow.content}>
        <Input
          type="checkbox"
          checked={done}
          onChange={onToggle}
          disabled={isToggling ?? isDeleting}
          aria-label={`Mark "${title}" as ${done ? 'incomplete' : 'complete'}`}
        />
        <Label
          size="large"
          className={done ? taskRow.textComplete : taskRow.text}
          onClick={onToggle}
        >
          {title}
        </Label>
      </div>
      <div className={taskRow.actions}>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          title={deleteRowButton}
          disabled={isToggling ?? isDeleting}
          aria-label={`Delete task "${title}"`}
        >
          <FaRegTrashAlt />
        </Button>
        <DeleteDialog
          title={title}
          isOpen={isDialogOpen}
          isDeleting={isDeleting}
          onConfirm={handleDeleteTask}
          onCancel={() => setIsDialogOpen(false)}
        />

        <Button
          variant="secondary"
          size="sm"
          onClick={onUpdate}
          title={updateRowButton}
          disabled={done}
          aria-label={`Edit task "${title}" ${done ? '(disabled - task completed)' : ''}`}
        >
          <FaPencilAlt />
        </Button>
      </div>
    </li>
  );
};

export const TaskRow = TaskRowComponent;

TaskRow.displayName = 'TaskRow';
