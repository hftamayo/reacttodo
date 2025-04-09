import { useMemo } from 'react';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import TaskBoardPresenter from './TaskBoardPresenter';

export const TaskBoardContainer: React.FC = () => {
  const { ref, tasks, error, isLoading, errorMessage, taskStats } =
    useTaskBoard();

  return (
    <TaskBoardPresenter
      ref={ref}
      tasks={tasks}
      isLoading={isLoading}
      totalTasks={taskStats.total}
      completedTasks={taskStats.completed}
      error={error ?? undefined}
    />
  );
};
