import React, { useState, useCallback, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { UpdateTaskCard } from '@/features/task/components/update/UpdateTaskCard';
import { TaskRow } from '@/features/task/components/TaskRow';
import { OffsetPagination } from '@/shared/components/pagination/OffsetPagination';
import CustomModal from '@/shared/components/ui/modal/CustomModal';
import { taskBoard } from '@/shared/utils/twind/styles';
import { TaskProps, TaskBoardPresenterProps } from '@/shared/types/api.type';
import { showError } from '@/shared/services/notification/notificationService';

export const TaskBoardPresenter: React.FC<TaskBoardPresenterProps> = ({
  tasks,
  isLoading,
  totalTasks,
  currentPage,
  totalPages,
  onPageChange,
  completedTasks,
  error,
  onClose,
  mutations,
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
        <p className={taskBoard.error}>
          Failed to load data. Incident reported
        </p>
      );
    }

    if (!tasks || tasks.length === 0) {
      return (
        <div className="flex justify-center p-4">
          <p>No ongoing tasks</p>
        </div>
      );
    }

    return (
      <ul>
        {tasks.map((task) => (
          <TaskRow key={task.id} onEdit={handleEdit} {...task} />
        ))}
      </ul>
    );
  }, [tasks, error, handleEdit]);

  return (
    <div className={taskBoard.bg}>
      <div className={taskBoard.container}>
        <div className="relative flex items-center justify-center mb-4">
          <h3 className="text-3xl font-bold text-[var(--text-color)]">
            Task Board
          </h3>
          <button
            onClick={onClose}
            className="absolute right-0 inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Close task board"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <AddTaskForm mutations={mutations} />
        <div className="mb-4">
          {taskList}
          <OffsetPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="mt-4"
          />
        </div>
        <CustomModal isOpen={!!editingTask} onDismiss={handleCloseModal}>
          {editingTask && (
            <UpdateTaskCard {...editingTask} onClose={handleCloseModal} />
          )}
        </CustomModal>
        {totalTasks > 0 && (
          <p className={taskBoard.count}>
            {`Tasks summary: ${totalTasks} actives, ${completedTasks} completed`}
          </p>
        )}
      </div>
    </div>
  );
};

TaskBoardPresenter.displayName = 'TaskBoardPresenter';
