import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { taskHooks } from '@/features/task/hooks/taskHooks';
import TaskBoardPresenter from './TaskBoardPresenter';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const TaskBoardContainer: React.FC = () => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = taskHooks.useGetTasks(shouldFetch);
  const tasks = data?.data.tasks ? Array.from(data.data.tasks.values()) : [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        className: toasterMessages.errorToaster,
      });
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
