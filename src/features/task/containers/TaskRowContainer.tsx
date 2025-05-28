import React from 'react';
import { TaskProps } from '@/shared/types/api.type';
import { selectIsTaskOptimistic } from '@/features/task/store/taskSelectors';
import { TaskRow } from '../components/TaskRow';
import { showError } from '@/shared/services/notification/notificationService';
import { useSelector } from 'react-redux';

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
  const isOptimistic = useSelector(selectIsTaskOptimistic(task.id));

  const handleToggleComplete = async () => {
    try {
      await onToggleTask(task.id);
    } catch (error) {
      console.error('Error toggling task:', error);
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
      isOptimistic={isOptimistic}
    />
  );
};

TaskRowContainer.displayName = 'TaskRowContainer';
