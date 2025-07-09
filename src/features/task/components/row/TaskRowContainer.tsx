import { FC } from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { TaskRow } from './TaskRow';

interface TaskRowContainerProps {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
}

export const TaskRowContainer: FC<TaskRowContainerProps> = ({ task, onEdit }) => {
  return <TaskRow {...task} onEdit={onEdit} />;
};

TaskRowContainer.displayName = 'TaskRowContainer';
