import { useMemo } from 'react';
import { TaskProps, TaskStatsProps } from '@/shared/types/api.type';

export const useTaskStats = (
  tasks: TaskProps[],
  totalCount: number,
  lastModified?: string
) => {
  return useMemo((): TaskStatsProps => {
    const completedTasks = tasks.filter((task) => task.done).length;

    return {
      total: totalCount,
      completed: completedTasks,
      lastUpdated: lastModified
        ? new Date(lastModified).toLocaleString()
        : new Date().toLocaleString(),
    };
  }, [tasks, totalCount, lastModified]);
};
