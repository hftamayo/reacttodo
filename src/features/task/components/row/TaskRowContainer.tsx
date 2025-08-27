import { FC, useState } from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { TaskRow } from './TaskRow';
import { useTaskBoardActions } from '../../hooks/composition/useTaskBoardActions';

interface TaskRowContainerProps {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
}

export const TaskRowContainer: FC<TaskRowContainerProps> = ({ task, onEdit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Use the hook for mutation handlers and states (excluding update)
  const { onToggle, onDelete, isToggling, isDeleting } =
    useTaskBoardActions(task);

  const handleDeleteTask = async () => {
    await onDelete();
    setIsDialogOpen(false);
  };

  const handleEditTask = () => {
    onEdit(task);
  };

  const handleToggleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <TaskRow
      {...task}
      onToggle={onToggle}
      onDelete={() => handleToggleDialog(true)}
      onEdit={handleEditTask}
      isToggling={isToggling}
      isDeleting={isDeleting}
      isDialogOpen={isDialogOpen}
      onConfirmDelete={handleDeleteTask}
      onCancelDelete={() => handleToggleDialog(false)}
    />
  );
};

TaskRowContainer.displayName = 'TaskRowContainer';
