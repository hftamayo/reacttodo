import React from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { TaskRow } from './TaskRow';
import { PaginationParams } from '@/shared/types/api.type';

interface TaskRowContainerProps {
  task: TaskProps;
}

export const TaskRowContainer: React.FC<TaskRowContainerProps> = ({
  task,
}) => {
  return <TaskRow {...task} />;
};

TaskRowContainer.displayName = 'TaskRowContainer';
