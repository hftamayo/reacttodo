import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useLocation } from 'wouter';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();
  const { ref, tasks, error, isLoading, pagination, taskStats, mutations } =
    useTaskBoard({
      limit: 5,
      cursor: null,
    });

  const handleLoadMore = () => {
    if (pagination.hasMore && pagination.nextCursor) {
      // useTaskBoard will handle the next page fetch
    }
  };

  const handleClose = () => {
    setLocation('/');
  };

  if (isLoading && !tasks.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

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
        hasMore={pagination.hasMore}
        onLoadMore={handleLoadMore}
        onClose={handleClose}
        mutations={mutations}
      />
    </ErrorBoundary>
  );
};
