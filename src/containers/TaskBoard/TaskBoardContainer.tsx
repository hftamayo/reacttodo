import React from 'react';
import { useLocation } from 'wouter';
import { TaskBoardPresenter } from './TaskBoardPresenter';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useTaskBoard } from '@/features/task/hooks/useTaskBoard';
import { AddTaskProps, TaskProps } from '@/shared/types/api.type';

export const TaskBoardContainer: React.FC = () => {
  const { handleError } = useErrorHandler('TaskBoard');
  const [, setLocation] = useLocation();

  const { tasks, pagination, isLoading, error, mutations, setCurrentPage } =
    useTaskBoard();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  const handleClose = () => {
    setLocation('/');
  };

  const handleAddTask = async (newTask: AddTaskProps) => {
    await mutations.addTask.mutateAsync(newTask);
  };

  const handleUpdateTask = async (task: TaskProps) => {
    await mutations.updateTask.mutateAsync(task);
  };

  const handleToggleTask = async (id: number) => {
    await mutations.toggleTaskDone.mutateAsync({ id });
  };

  const handleDeleteTask = async (id: number) => {
    await mutations.deleteTask.mutateAsync(id);
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
        pagination={pagination}
        isLoading={isLoading}
        error={error as Error}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onPageChange={handlePageChange}
      />
    </ErrorBoundary>
  );
};
