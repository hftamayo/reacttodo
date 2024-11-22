import React, { useEffect } from 'react';
import AddTaskForm from '../features/task/components/AddTaskForm';
import TaskRow from '../features/task/components/TaskRow';
import { taskBoard } from '@/shared/utils/twind/styles';
import { taskHooks } from '@/shared/services/api/tasks/taskHooks';
import useLazyLoad from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { APP_NAME } from '@/shared/utils/envvars';
import { toast } from 'sonner';

const TaskBoard: React.FC = () => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = taskHooks.useGetTasks(shouldFetch);
  //console.log('data received in TaskBoard: ', data);
  const tasks = data?.tasks ? Array.from(data.tasks.values()) : [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.complete).length;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

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
          <p
            className={taskBoard.count}
          >{`You have ${totalTasks} tasks, ${completedTasks} completed`}</p>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default TaskBoard;
