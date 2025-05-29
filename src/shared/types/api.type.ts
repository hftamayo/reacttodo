import { useTaskMutations } from '@/features/task/hooks/core/useTaskMutations';

//common types:
export type MongoId = string;
export type SqlId = number;

export interface EntityIdentifier<T> {
  id: T;
}

export type ApiResponse<T> = {
  code: number;
  resultMessage: string;
  data: T;
  timestamp?: number;
  cacheTTL?: number;
};

export type ApiError = {
  code: number;
  resultMessage: string;
};

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
export type TaskIdentifier = EntityIdentifier<SqlId>;
export type MongoTaskIdentifier = EntityIdentifier<MongoId>;

export type TaskProps = {
  id: SqlId;
  title: string;
  description: string;
  done: boolean;
  owner: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
};

export type AddTaskProps = Pick<TaskProps, 'title' | 'owner'>;
//export type AddTaskProps = Pick<TaskProps, 'title' | 'description' | 'owner'>;

//pagination and task related ops

export type PaginationMetadata = {
  limit: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  order: 'desc' | 'asc';
  hasMore: boolean;
  hasPrev: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export type TaskData = {
  tasks: TaskProps[];
  pagination: PaginationMetadata;
  etag?: string;
  lastModified?: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type TaskStats = {
  total: number;
  completed: number;
  lastUpdated?: string;
};

export type TaskBoardState = {
  tasks: TaskProps[];
  isLoading: boolean;
  error: Error | null;
  pagination: PaginationMetadata;
  taskStats: TaskStats;
  mutations: ReturnType<typeof useTaskMutations>;
  cacheInfo?: {
    isCached: boolean;
    lastFetched: string;
    remainingTTL: number;
  };
  refetch?: () => void;
  setCurrentPage: (page: number) => void;
  ref?: React.RefObject<HTMLElement>;
};

export type TaskBoardPresenterProps = {
  // Data
  tasks: TaskProps[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    completedCount?: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasMore: boolean;
    hasPrev: boolean;
  };

  // Loading states
  isLoading: boolean;
  isAdding?: boolean;
  isUpdating?: boolean;
  isToggling?: boolean;
  isDeleting?: boolean;

  // Error handling
  error?: Error;

  // Callbacks
  onAddTask: (task: AddTaskProps) => Promise<void>;
  onUpdateTask: (task: TaskProps) => Promise<void>;
  onToggleTask: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  onPageChange: (page: number) => void;
  onClose: () => void;
};

export type OffsetPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  // Enhanced pagination flags to improve UI controls
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasMore?: boolean;
  hasPrev?: boolean;
  // Optional loading state
  isLoading?: boolean;
};
