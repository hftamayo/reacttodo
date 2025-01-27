import React from 'react';
import { AddTaskForm } from '@/features/task/components/AddTaskForm';
import { TaskRow } from '@/features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { APP_NAME } from '@/shared/utils/envvars';
import { TaskBoardPresenterProps } from '@/shared/types/task.type';

export const TaskBoardPresenter: React.FC<TaskBoardPresenterProps> = ({
  ref,
  tasks,
  isLoading,
  totalTasks,
  completedTasks,
}) => {
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
};
