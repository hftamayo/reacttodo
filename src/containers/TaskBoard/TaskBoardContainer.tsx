import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import TaskBoardPresenter from './TaskBoardPresenter';
import { navigate } from 'wouter/use-browser-location';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const { ref, tasks, error, isLoading, taskStats } = useTaskBoard();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-semibold mb-4">
            Task Board Failed to Load
          </h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      }
      onError={handleError}
    >
      <TaskBoardPresenter
        ref={ref}
        tasks={tasks}
        isLoading={isLoading}
        totalTasks={taskStats.total}
        completedTasks={taskStats.completed}
        error={error ?? undefined}
        onClose={handleClose}
      />
    </ErrorBoundary>
  );
};
