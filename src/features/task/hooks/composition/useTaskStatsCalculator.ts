import { useMemo } from 'react';
import { TaskProps, TaskStats } from '@/shared/types/domains/task.type';

export type TaskStatsCalculatorReturn = TaskStats;

export const useTaskStatsCalculator = (
  tasks: TaskProps[],
  totalCount: number,
  lastModified?: string
): TaskStatsCalculatorReturn => {
  return useMemo(() => {
    const completedTasks = tasks.filter((task) => task.done).length;
    const remainingTasks = totalCount - completedTasks;

    return {
      total: totalCount,
      completed: completedTasks,
      remaining: remainingTasks,
      lastUpdated: lastModified
        ? new Date(lastModified).toLocaleString()
        : new Date().toLocaleString(),
    };
  }, [tasks, totalCount, lastModified]);
}; 