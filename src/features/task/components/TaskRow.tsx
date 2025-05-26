import React, { useState } from 'react';
import { TaskProps } from '@/shared/types/api.type';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { taskRow } from '../../../shared/utils/twind/styles';
import { DeleteDialog } from '@/shared/components/dialogs/DeleteDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setLastOperation } from '../store/taskSlice';
import { selectIsTaskOptimistic } from '../store/taskSelectors';
import { showError } from '@/shared/services/notification/notificationService';

interface TaskRowProps extends TaskProps {
  onEdit: (task: TaskProps) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  id,
  title,
  description,
  done = false,
  owner,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { text: deleteRowButton } = useTranslation('deleteRowButton');
  const { text: updateRowButton } = useTranslation('updateRowButton');
  const { handleToggle, handleDelete, isToggling, isDeleting } =
    useTaskOperations();

  const isOptimistic = useSelector(selectIsTaskOptimistic(id));

  const handleToggleComplete = async () => {
    try {
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'toggle', taskId: id }));
      await handleToggle(id);
    } catch (error) {
      console.error('Error toggling task:', error);
      showError('Failed to toggle task completion');
    }
  };

  const handleDeleteTask = async () => {
    try {
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'delete', taskId: id }));
      await handleDelete(id);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      showError('Failed to delete task');
    }
  };

  const handleUpdateTask = () => {
    onEdit({ id, title, description, done, owner });
  };

  return (
    <li
      className={`${done ? taskRow.liComplete : taskRow.li} ${isOptimistic ? 'bg-blue-50' : ''}`}
      data-testid={`task-row-${id}`}
    >
      <div className={taskRow.content}>
        <Input
          type="checkbox"
          checked={done}
          onChange={handleToggleComplete}
          disabled={isToggling || isDeleting}
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
          onClick={() => setIsDialogOpen(true)}
          title={deleteRowButton}
          disabled={isToggling || isDeleting}
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
};

TaskRow.displayName = 'TaskRow';
