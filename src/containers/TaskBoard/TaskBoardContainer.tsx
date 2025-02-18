import React, { useEffect } from 'react';
import { taskHooks } from '@/features/task/hooks/taskHooks';
import TaskBoardPresenter from './TaskBoardPresenter';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { getErrorMessage } from '@/shared/utils/error/errorUtils';

export const TaskBoardContainer: React.FC = () => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = taskHooks.useGetTasks(shouldFetch);
  const tasks = data?.data.tasks ? Array.from(data.data.tasks.values()) : [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;

  useEffect(() => {
    if (error) {
      getErrorMessage(error);
    }
  }, [error]);

  return (
    <TaskBoardPresenter
      ref={ref}
      tasks={tasks}
      isLoading={isLoading}
      totalTasks={totalTasks}
      completedTasks={completedTasks}
    />
  );
};
