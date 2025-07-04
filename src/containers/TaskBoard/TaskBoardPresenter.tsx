import React, { useState, useCallback, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { UpdateTaskCard } from '@/features/task/components/update/UpdateTaskCard';
import { TaskRowContainer } from '@/features/task/components/row/TaskRowContainer';
import { OffsetPagination } from '@/shared/components/pagination/OffsetPagination';
import CustomModal from '@/shared/components/ui/modal/CustomModal';
import { TaskBoardStats } from '@/features/task/components/TaskBoardStats';
import { taskBoard } from '@/shared/utils/twind/styles';
import { TaskBoardPresenterProps } from '@/shared/types/api.type';
import { TaskProps } from '@/shared/types/domains/task.type';
import { showError } from '@/shared/services/notification/notificationService';
import { LoadingSpinner } from '@/shared/components/ui/loading/LoadingSpinner';

export const TaskBoardPresenter: React.FC<TaskBoardPresenterProps> = ({
  tasks,
  pagination,
  isLoading,
  error,
  onPageChange,
  onClose,
  isAdding = false,
  isUpdating = false,
  isToggling = false,
  isDeleting = false,
}) => {
  const [editingTask, setEditingTask] = useState<TaskProps | null>(null);

  const handleEdit = useCallback((task: TaskProps) => {
    setEditingTask(task);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingTask(null);
  }, []);

  const taskList = useMemo(() => {
    if (error) {
      showError(error.message);
      return (
        <div className="flex flex-col items-center justify-center p-4 text-red-600">
          <p className="font-semibold">Failed to load data</p>
          <p className="text-sm">Please try refreshing the page</p>
        </div>
      );
    }

    if (!tasks || tasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-gray-600">
          <p className="font-semibold">No tasks found</p>
          <p className="text-sm">Add a new task to get started</p>
        </div>
      );
    }

    return (
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskRowContainer
            key={task.id}
            task={task}
            paginationParams={{
              page: pagination.currentPage,
              limit: pagination.limit,
            }}
          />
        ))}
      </ul>
    );
  }, [
    tasks,
    tasks.length,
    error,
    handleEdit,
    pagination.currentPage,
    pagination.limit,
  ]);

  const renderContent = () => {
    if (isLoading && !tasks.length) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {taskList}
        {pagination.totalPages > 1 && (
          <OffsetPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            className="mt-4"
            isLoading={isLoading}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            hasMore={pagination.hasMore}
            hasPrev={pagination.hasPrev}
          />
        )}
      </div>
    );
  };

  return (
    <div className={taskBoard.bg}>
      <div className={taskBoard.container}>
        <div className="relative flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-[var(--text-color)]">
            Task Board
          </h3>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Close task board"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="mb-6">
          <AddTaskForm isAddingTask={isAdding} />
        </div>

        {renderContent()}

        <CustomModal
          isOpen={!!editingTask}
          onDismiss={handleCloseModal}
          aria-labelledby="update-task-modal"
        >
          {editingTask && (
            <UpdateTaskCard
              {...editingTask}
              onClose={handleCloseModal}
              isUpdating={isUpdating}
            />
          )}
        </CustomModal>
        <TaskBoardStats
          total={pagination.totalCount}
          completed={pagination.completedCount ?? 0}
        />
      </div>
    </div>
  );
};

TaskBoardPresenter.displayName = 'TaskBoardPresenter';
