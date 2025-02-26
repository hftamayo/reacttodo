//healthcheck types:
export type AppHealthDetails = {
  timestamp: string;
  uptime: number;
  memoryUsage: {
    total: number;
    free: number;
  };
  startTime: number;
};

export type DbHealthDetails = {
  timestamp: string;
  connectionTime?: number;
  databaseStatus?: string;
  error?: string;
};

export type HealthCheckProps<T> = {
  status: string;
  message: string;
  details?: T;
};

export type HealthCheckData<T> = {
  healthCheck: HealthCheckProps<T>;
};

//role types:
export type RoleProps = {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type RoleData = {
  newRole?: RoleProps;
  role?: RoleProps;
  roles: RoleProps[];
};

//user types:
export type UserProps = {
  id?: string;
  fullname: string;
  birthdate: string;
  email: string;
  password: string;
  status: boolean;
  role: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type UserData = {
  newUser?: UserProps;
  user?: UserProps;
  users: UserProps[];
};

//task types:
export type TaskProps = {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type AddTaskProps = Pick<TaskProps, 'title'>;

export type TaskData = {
  newTask?: AddTaskProps;
  task?: TaskProps;
  tasks: TaskProps[];
};

export type TaskContext = {
  previousTasks?: ApiResponse<TaskData>;
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
  error?: Error;
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
