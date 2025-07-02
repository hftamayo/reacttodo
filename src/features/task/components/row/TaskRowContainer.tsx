import React from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { TaskRow } from './TaskRow';
import { showError } from '@/shared/services/notification/notificationService';

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
  const handleToggleComplete = async () => {
    try {
      await onToggleTask(task.id);
    } catch (error) {
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
      {...task}
      onEdit={onEdit}
      onToggle={handleToggleComplete}
      onDelete={handleDeleteTask}
      isToggling={isToggling}
      isDeleting={isDeleting}
    />
  );
};

TaskRowContainer.displayName = 'TaskRowContainer';
