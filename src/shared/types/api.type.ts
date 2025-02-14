//healthcheck types:
export type HealthCheckProps = {
  status: string;
};

export type HealthCheckData = {
  healthCheck: HealthCheckProps;
};

//role types:
export type RoleProps = {
  id?: string;
  name: string;
  permissions: string[];
};

export type RoleData = {
  newRole?: RoleProps;
  role?: RoleProps;
  roles: RoleProps[];
};

//user types:
export type UserProps = {
  id?: string;
  username: string;
  email: string;
  roles: string[];
};

export type UserData = {
  newUser?: UserProps;
  user?: UserProps;
  users: UserProps[];
};

//task types:
export type TaskProps = {
  id?: string;
  name: string;
  completed: boolean;
};

export type AddTaskProps = Pick<TaskProps, 'name'>;

export type TaskData = {
  newTask?: TaskProps;
  task?: TaskProps;
  tasks: TaskProps[];
};

export type TasksState = {
  tasks: Map<string, TaskProps>;
  task: TaskProps | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
  msg: string | null;
};

export type TaskBoardPresenterProps = {
  ref: React.Ref<HTMLDivElement>;
  tasks: TaskProps[];
  isLoading: boolean;
  totalTasks: number;
  completedTasks: number;
};

//common types:
export type ApiResponse<T> = {
  httpStatusCode: number;
  resultMessage: string;
  data: T;
};

export type ApiError = {
  httpStatusCode: number;
  resultMessage: string;
};
