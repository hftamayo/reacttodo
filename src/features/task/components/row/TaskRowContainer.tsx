import React from 'react';
import { TaskProps } from '@/shared/types/domains/task.type';
import { TaskRow } from './TaskRow';
import { PaginationParams } from '@/shared/types/api.type';

interface TaskRowContainerProps {
  task: TaskProps;
  paginationParams: PaginationParams;
}

export const TaskRowContainer: React.FC<TaskRowContainerProps> = ({
  task,
  paginationParams,
}) => {
  return <TaskRow {...task} paginationParams={paginationParams} />;
};

TaskRowContainer.displayName = 'TaskRowContainer';
