import React, { ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'wouter';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { AddTaskProps, TaskProps } from '@/shared/types/domains/task.type';
import { showError } from '@/shared/services/notification/notificationService';

const TaskBoardFallback: React.FC<FallbackProps> = ({
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

export const TaskBoardContainer: React.FC = () => {
  const [, setLocation] = useLocation();

  const {
    tasks,
    pagination,
    isLoading,
    error,
    mutations,
    setCurrentPage,
    taskStats,
  } = useTaskBoard();

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

  const handleAddTask = async (newTask: AddTaskProps) => {
    try {
      await mutations.addTask.mutateAsync(newTask);
    } catch (error) {
      if (error instanceof Error && error.message.includes('CRITICAL')) {
        throw error;
      }
    }
  };

  const handleUpdateTask = async (task: TaskProps) => {
    try {
      await mutations.updateTask.mutateAsync(task);
    } catch (error) {
      if (error instanceof Error && error.message.includes('CRITICAL')) {
        throw error;
      }
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await mutations.toggleTaskDone.mutateAsync(id);
    } catch (error) {
      if (error instanceof Error && error.message.includes('CRITICAL')) {
        throw error;
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await mutations.deleteTask.mutateAsync(id);
    } catch (error) {
      if (error instanceof Error && error.message.includes('CRITICAL')) {
        throw error;
      }
    }
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
        isAdding={mutations.addTask.isPending}
        isUpdating={mutations.updateTask.isPending}
        isToggling={mutations.toggleTaskDone.isPending}
        isDeleting={mutations.deleteTask.isPending}
        error={error as Error}
        onClose={handleClose}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onPageChange={handlePageChange}
      />
    </ErrorBoundary>
  );
};
