import { useTaskMutations } from '@/features/task/hooks/useTaskMutations';
import React from 'react';

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
// Base pagination metadata shared between both types
export interface BasePagination {
  limit: number;
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  order: 'desc' | 'asc';
}

// Cursor-based pagination metadata
export interface CursorPagination extends BasePagination {
  type: 'cursor';
  nextCursor: string | null;
  prevCursor: string | null;
}

// Offset-based pagination metadata
export interface OffsetPagination extends BasePagination {
  type: 'offset';
  page: number;
}

// Union type for both pagination styles
export type PaginationMetadata = CursorPagination | OffsetPagination;

// Parameters for API calls
export type CursorParams = {
  type: 'cursor';
  limit: number;
  cursor?: string | null;
};

export type OffsetParams = {
  type: 'offset';
  page: number;
  limit: number;
};

export type PaginationParams = CursorParams | OffsetParams;

export type TaskData = {
  pagination: PaginationMetadata;
  tasks: TaskProps[];
};

export type TaskStats = {
  total: number;
  completed: number;
};

export type TaskContext = {
  previousTasks?: ApiResponse<TaskData>;
};

export type TaskBoardState = {
  ref?: React.RefObject<HTMLDivElement>;
  tasks: TaskProps[];
  isLoading: boolean;
  error: Error | null;
  pagination: PaginationMetadata;
  taskStats: TaskStats;
  mutations: ReturnType<typeof useTaskMutations>;
};

export type TaskBoardPresenterProps = {
  tasks: TaskProps[];
  isLoading: boolean;
  totalTasks: number;
  completedTasks: number;
  hasMore: boolean;
  onLoadMore: () => void;
  error?: Error;
  onClose: () => void;
  mutations: ReturnType<typeof useTaskMutations>;
  paginationType: 'cursor' | 'offset';
};

export type CustomPaginationProps = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
};
