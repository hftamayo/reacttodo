import React, { forwardRef, useMemo } from 'react';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { TaskRow } from '@/features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { TaskBoardPresenterProps } from '@/shared/types/api.type';
import { showError } from '@/shared/services/notification/notificationService';

const TaskBoardPresenter = forwardRef<HTMLDivElement, TaskBoardPresenterProps>(
  ({ tasks, isLoading, totalTasks, completedTasks, error }, ref) => {
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
            <TaskRow key={task.id} {...task} />
          ))}
        </ul>
      );
    }, [tasks, isLoading, error]);

    return (
      <div className={taskBoard.bg}>
        <div className={taskBoard.container}>
          <h3 className={taskBoard.heading}>Task Board</h3>
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
