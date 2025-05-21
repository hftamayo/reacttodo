import React, { useState } from 'react';
import { TaskProps } from '@/shared/types/api.type';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { taskRow } from '../../../shared/utils/twind/styles';
import { DeleteDialog } from '@/shared/components/dialogs/DeleteDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLastOperation,
  setOptimisticUpdate,
  clearOptimisticUpdate,
  incrementCompletedCount,
  decrementCompletedCount,
  decrementTaskCount,
} from '../store/taskSlice';
import { selectIsTaskOptimistic } from '../store/taskSelectors';

interface TaskRowProps extends TaskProps {
  onEdit: (task: TaskProps) => void;
  isOptimistic?: boolean;
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
  const { toggleTaskDone, deleteTask } = useTaskMutations();

  const isOptimistic = useSelector(selectIsTaskOptimistic(id));

  const handleToggleComplete = async () => {
    try {
      const newDoneState = !done;
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'toggle', taskId: id }));
      dispatch(
        setOptimisticUpdate({
          taskId: id,
          task: { id, title, description, done: newDoneState, owner },
        })
      );

      // Update completed count
      if (done) {
        dispatch(decrementCompletedCount());
      } else {
        dispatch(incrementCompletedCount());
      }

      // Perform the actual mutation
      await toggleTaskDone.mutateAsync({ id });
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'delete', taskId: id }));
      dispatch(decrementTaskCount());
      if (done) {
        dispatch(decrementCompletedCount());
      }

      // Perform the actual mutation
      await deleteTask.mutateAsync(id);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
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
          disabled={toggleTaskDone.isPending}
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
          disabled={deleteTask.isPending}
          aria-label={`Delete task "${title}"`}
        >
          <FaRegTrashAlt />
        </Button>
        <DeleteDialog
          title={title}
          isOpen={isDialogOpen}
          isDeleting={deleteTask.isPending}
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
