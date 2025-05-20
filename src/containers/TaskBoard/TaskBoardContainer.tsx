import { useState } from 'react';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useLocation } from 'wouter';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const { tasks, error, isLoading, pagination, taskStats, mutations } =
    useTaskBoard({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        tasks={tasks}
        isLoading={isLoading}
        totalTasks={taskStats.total}
        completedTasks={taskStats.completed}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        error={error ?? undefined}
        onClose={handleClose}
        mutations={mutations}
      />
    </ErrorBoundary>
  );
};
