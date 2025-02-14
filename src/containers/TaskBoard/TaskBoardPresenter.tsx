import React, { forwardRef } from 'react';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { TaskRow } from '@/features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { APP_NAME } from '@/shared/utils/envvars';
import { TaskBoardPresenterProps } from '@/shared/types/api.type';

const TaskBoardPresenter = forwardRef<HTMLDivElement, TaskBoardPresenterProps>(
  ({ tasks, isLoading, totalTasks, completedTasks }, ref) => {
    return (
      <div className={taskBoard.bg}>
        <div className={taskBoard.container}>
          <h3 className={taskBoard.heading}>{APP_NAME}</h3>
          <AddTaskForm />
          {isLoading && <p>Loading...</p>}
          <ul>
            {tasks.map((task) => (
              <TaskRow key={task.id} {...task} />
            ))}
          </ul>
          {totalTasks < 1 ? null : (
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

export default TaskBoardPresenter;
