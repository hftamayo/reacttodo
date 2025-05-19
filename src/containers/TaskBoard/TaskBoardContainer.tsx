import { useState } from 'react';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useLocation } from 'wouter';
import { CursorPagination } from '@/shared/types/api.type';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);

  const { ref, tasks, error, isLoading, pagination, taskStats, mutations } =
    useTaskBoard({
      type: 'cursor',
      limit: 5,
      cursor: currentCursor,
    });

  const handleLoadMore = () => {
    if (pagination.hasMore && (pagination as CursorPagination).nextCursor) {
      setCurrentCursor((pagination as CursorPagination).nextCursor);
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
        paginationType="cursor"
      />
    </ErrorBoundary>
  );
};
