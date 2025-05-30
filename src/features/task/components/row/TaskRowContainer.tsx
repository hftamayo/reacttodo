import React, { useState, useEffect } from 'react';
import { TaskProps } from '@/shared/types/api.type';
import { TaskRow } from './TaskRow';
import { showError } from '@/shared/services/notification/notificationService';
import { useQueryClient } from '@tanstack/react-query';

interface TaskRowContainerProps {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
  onToggleTask: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  isToggling?: boolean;
  isDeleting?: boolean;
}

export const TaskRowContainer: React.FC<TaskRowContainerProps> = ({
  task,
  onEdit,
  onToggleTask,
  onDeleteTask,
  isToggling = false,
  isDeleting = false,
}) => {
  const queryClient = useQueryClient();
  const [localDone, setLocalDone] = useState(task.done);

  useEffect(() => {
    setLocalDone(task.done);
  }, [task.done]);

  // Check if the task is in an optimistic state by looking at the query cache
  const isOptimistic = React.useMemo(() => {
    const pendingMutations = queryClient
      .getMutationCache()
      .getAll()
      .filter(
        (mutation) =>
          mutation.state.status === 'pending' &&
          (mutation.state.variables as { id?: number })?.id === task.id
      );
    return pendingMutations.length > 0;
  }, [queryClient, task.id]);

  const handleToggleComplete = async () => {
    setLocalDone(!localDone);

    try {
      await onToggleTask(task.id);
    } catch (error) {
      setLocalDone((prev) => prev); // Revert to previous state on error
      console.error('Error toggling task completion:', error);
      showError('Failed to toggle task completion');
    }
  };
  const handleDeleteTask = async () => {
    try {
      await onDeleteTask(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      showError('Failed to delete task');
    }
  };

  return (
    <TaskRow
      key={`task-${task.id}-${localDone}`}
      {...task}
      done={localDone}
      onEdit={onEdit}
      onToggle={handleToggleComplete}
      onDelete={handleDeleteTask}
      isToggling={isToggling}
      isDeleting={isDeleting}
      isOptimistic={isOptimistic}
    />
  );
};

TaskRowContainer.displayName = 'TaskRowContainer';
