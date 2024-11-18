import React from 'react';
import AddTaskForm from '../features/task/components/AddTask';
import TaskRow from '../features/task/components/TaskRow';
import { taskBoard } from '../shared/utils/twind/styles';
import { taskHooks } from '../shared/services/api/tasks/taskHooks';

const TaskBoard: React.FC = () => {
  const { data, error, isLoading } = taskHooks.useGetTasks();
  //console.log('data received in TaskBoard: ', data);
  const tasks = data?.tasks ? Array.from(data.tasks.values()) : [];

  return (
    <div className={taskBoard.bg}>
      <div className={taskBoard.container}>
        <h3 className={taskBoard.heading}>ToDo App</h3>
        <AddTaskForm />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ul>
          {tasks.map((task) => (
            <TaskRow key={task.id} {...task} />
          ))}
        </ul>
        {tasks.length < 1 ? null : (
          <p className={taskBoard.count}>{`You have ${tasks.length} todos`}</p>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
