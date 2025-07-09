import { FC, ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'wouter';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { useTaskBoardLoadingStates } from '@/features/task/hooks/composition/useTaskBoardLoadingStates';
import { showError } from '@/shared/services/notification/notificationService';

const TaskBoardFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-xl font-semibold mb-4">Task Board Failed to Load</h2>
    <p className="text-gray-600">
      {error?.message ?? 'Please try refreshing the page'}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Try Again
    </button>
  </div>
);

export const TaskBoardContainer: FC = () => {
  const [, setLocation] = useLocation();

  const { tasks, pagination, isLoading, error, setCurrentPage, taskStats } =
    useTaskBoard();

  const { isAdding, isUpdating } = useTaskBoardLoadingStates();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Task Board Error:', error, errorInfo);
    showError('An error occurred in the Task Board');
  };

  const handleClose = () => {
    setLocation('/');
  };

  return (
    <ErrorBoundary FallbackComponent={TaskBoardFallback} onError={handleError}>
      <TaskBoardPresenter
        tasks={tasks}
        pagination={{
          ...pagination,
          completedCount: taskStats.completed,
        }}
        isLoading={isLoading}
        isAdding={isAdding}
        isUpdating={isUpdating}
        error={error as Error}
        onClose={handleClose}
        onPageChange={handlePageChange}
      />
    </ErrorBoundary>
  );
};
