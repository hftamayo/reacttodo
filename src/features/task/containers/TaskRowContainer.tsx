import React from 'react';
import { TaskProps } from '@/shared/types/api.type';
import { TaskRow } from '../components/TaskRow';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useDispatch } from 'react-redux';
import { setLastOperation } from '../store/taskSlice';
import { showError } from '@/shared/services/notification/notificationService';

interface TaskRowContainerProps {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
}

export const TaskRowContainer: React.FC<TaskRowContainerProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const { handleToggle, handleDelete, isToggling, isDeleting } = useTaskOperations();

  const handleToggleComplete = async () => {
    try {
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'toggle', taskId: task.id }));
      
      // Perform the toggle operation
      const success = await handleToggle(task.id);
      
      if (!success) {
        // If the operation failed, we don't need to do anything
        // as the optimistic update will be rolled back
        return;
      }
    } catch (error) {
      console.error('Error toggling task:', error);
      showError('Failed to toggle task completion');
    }
  };

  const handleDeleteTask = async () => {
    try {
      // Set optimistic update in Redux
      dispatch(setLastOperation({ type: 'delete', taskId: task.id }));
      await handleDelete(task.id);
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