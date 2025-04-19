import React, { forwardRef, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { TaskRow } from '@/features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { TaskBoardPresenterProps } from '@/shared/types/api.type';
import { showError } from '@/shared/services/notification/notificationService';

const TaskBoardPresenter = forwardRef<HTMLDivElement, TaskBoardPresenterProps>(
  (
    { tasks, isLoading, totalTasks, completedTasks, error, onClose, mutations },
    ref
  ) => {
    console.log('mutations in TaskBoardPresenter', mutations);
    const taskList = useMemo(() => {
      if (error) {
        showError(error.message);
        return (
          <p className={taskBoard.error}>
            Failed to load data. Incident reported
          </p>
        );
      }

      if (isLoading) {
        return <p>Loading data...</p>;
      }

      if (tasks.length === 0) {
        return <p>No ongoing tasks</p>;
      }

      return (
        <ul>
          {tasks.map((task) => (
            <TaskRow key={task.id} {...task} mutations={mutations} />
          ))}
        </ul>
      );
    }, [tasks, isLoading, error, mutations]);

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
          <AddTaskForm />
          {taskList}
          {totalTasks > 0 && (
            <p className={taskBoard.count}>
              {`You have ${totalTasks} tasks, ${completedTasks} completed`}
            </p>
          )}
          <div ref={ref}></div>
        </div>
      </div>
    );
  }
);

export default React.memo(TaskBoardPresenter);
