import { useState, useCallback } from 'react';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { showError } from '@/shared/services/notification/notificationService';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const queryClient = useQueryClient();

  const { tasks, error, isLoading, pagination, taskStats, mutations } =
    useTaskBoard({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    });

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTaskDeleted = useCallback(async (deletedTaskId: number) => {
    try {
      // Remove the task from the cache immediately
      queryClient.setQueryData(['tasks', { page: currentPage, limit: ITEMS_PER_PAGE }], (oldData: any) => {
        if (!oldData?.data?.tasks) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            tasks: oldData.data.tasks.filter((task: any) => task.id !== deletedTaskId)
          }
        };
      });

      // Invalidate all task-related queries
      await queryClient.invalidateQueries({ 
        queryKey: ['tasks'],
        refetchType: 'all'
      });
      
      // If we're on the last page and it's the last item, go to previous page
      if (tasks.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      // If we're on a page that's now empty, go to the first page
      else if (tasks.length === 1 && currentPage === 1) {
        setCurrentPage(1);
      }
      
      // Force a refetch of all task-related queries
      await Promise.all([
        queryClient.refetchQueries({ 
          queryKey: ['tasks'],
          type: 'active'
        }),
        queryClient.refetchQueries({ 
          queryKey: ['tasks', { page: currentPage, limit: ITEMS_PER_PAGE }],
          type: 'active'
        })
      ]);
    } catch (error) {
      console.error('Error handling task deletion:', error);
      showError('Failed to update task list after deletion');
    }
  }, [tasks.length, currentPage, queryClient, ITEMS_PER_PAGE]);

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
        onTaskDeleted={handleTaskDeleted}
        error={error ?? undefined}
        onClose={handleClose}
        mutations={mutations}
      />
    </ErrorBoundary>
  );
};
