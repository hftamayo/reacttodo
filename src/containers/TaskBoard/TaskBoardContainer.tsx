import React from 'react';
import { useLocation } from 'wouter';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { AddTaskProps, TaskProps } from '@/shared/types/domains/task.type';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();

  const {
    tasks,
    pagination,
    isLoading,
    error,
    mutations,
    setCurrentPage,
    taskStats,
    refetch,
  } = useTaskBoard();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleClose = () => {
    setLocation('/');
  };

  const handleAddTask = async (newTask: AddTaskProps) => {
    try {
      await mutations.addTask.mutateAsync(newTask);
    } catch (error) {
      handleError(error as Error, { componentStack: '' });
    }
  };

  const handleUpdateTask = async (task: TaskProps) => {
    try {
      await mutations.updateTask.mutateAsync(task);
    } catch (error) {
      handleError(error as Error, { componentStack: '' });
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await mutations.toggleTaskDone.mutateAsync(id);
    } catch (error) {
      handleError(error as Error, { componentStack: '' });
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await mutations.deleteTask.mutateAsync(id);
    } catch (error) {
      handleError(error as Error, { componentStack: '' });
    }
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
