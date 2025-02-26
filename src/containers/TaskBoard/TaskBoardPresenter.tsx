import React, { forwardRef, useMemo } from 'react';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { TaskRow } from '@/features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { APP_NAME } from '@/shared/utils/envvars';
import { TaskBoardPresenterProps } from '@/shared/types/api.type';
import { showUIError } from '@/shared/utils/error/errorUtils';

const TaskBoardPresenter = forwardRef<HTMLDivElement, TaskBoardPresenterProps>(
  ({ tasks, isLoading, totalTasks, completedTasks, error }, ref) => {
    const taskList = useMemo(() => {
      if (error) {
        showUIError(error.message);
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
          <h3 className={taskBoard.heading}>{APP_NAME}</h3>
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
