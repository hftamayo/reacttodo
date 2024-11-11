import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../shared/services/redux/storeHooks';
import { getTasks } from '../shared/services/redux/taskSlice';
import AddTaskForm from '../features/task/components/AddTask';
import TaskRow from '../features/task/components/TaskRow';
import { taskBoard } from '../shared/utils/twind/styles';

const TaskBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) =>
    Array.from(state.task.tasks.values())
  );
  const loading = useAppSelector((state) => state.task.loading);
  const error = useAppSelector((state) => state.task.error);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className={taskBoard.bg}>
      <div className={taskBoard.container}>
        <h3 className={taskBoard.heading}>ToDo App</h3>
        <AddTaskForm />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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
