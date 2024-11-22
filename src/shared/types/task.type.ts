export type TaskProps = {
  id?: string;
  name: string;
  complete: boolean;
};

export type AddTaskProps = Pick<TaskProps, 'name'>;

export type TaskResponse = {
  httpStatusCode: number;
  resultMessage: string;
  newTask?: TaskProps;
  task?: TaskProps;
  tasks: TaskProps[];
};

export type TaskContext = {
  previousTasks?: TaskResponse;
};

export type TasksState = {
  tasks: Map<string, TaskProps>;
  task: TaskProps | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
  msg: string | null;
};

export type ApiError = {
  response: {
    resultMessage: string;
  };
};
