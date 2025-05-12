import React, { memo } from 'react';
import { TaskProps } from '../../../shared/types/api.type';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { taskRow } from '../../../shared/utils/twind/styles';

interface TaskRowProps extends TaskProps {
  mutations: ReturnType<typeof useTaskMutations>;
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
    mutations,
  }) => {
    const { text: deleteRowButton } = useTranslation('deleteRowButton');
    const { text: updateRowButton } = useTranslation('updateRowButton');
    const { deleteTask, updateTask, toggleTaskDone } = mutations;

    const handleToggleComplete = () => {
      if (toggleTaskDone.isPending) return;

      toggleTaskDone.mutate({ id });
    };

    const handleUpdateTask = () => {
      if (updateTask.isPending) return;
      if (!id) {
        console.error('Task ID is undefined. Cannot update task.');
        return;
      }

      onEdit({
        id,
        title,
        description,
        done,
        owner,
      });
    };

    const handleDeleteTask = () => {
      if (deleteTask.isPending) return;
      if (!id) {
        console.error('Task ID is undefined. Cannot delete task.');
        return;
      }
      deleteTask.mutate(id);
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
            disabled={updateTask.isPending}
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
            disabled={deleteTask.isPending}
            aria-label={`Delete task "${title}"`}
          >
            <FaRegTrashAlt />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUpdateTask}
            title={updateRowButton}
            disabled={updateTask.isPending || done}
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
