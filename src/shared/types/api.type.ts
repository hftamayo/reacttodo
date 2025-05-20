import { useTaskMutations } from '@/features/task/hooks/useTaskMutations';
import React from 'react';
import { QueryKey } from '@tanstack/react-query';

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
export type PaginationMetadata = {
  limit: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  order: 'desc' | 'asc';
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type TaskData = {
  pagination: PaginationMetadata;
  tasks: TaskProps[];
};

export type TaskStats = {
  total: number;
  completed: number;
};

export type TaskContext = {
  previousQueries?: Array<{
    queryKey: QueryKey;
    data: ApiResponse<TaskData> | undefined;
  }>;
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
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  error?: Error;
  onClose: () => void;
  mutations: ReturnType<typeof useTaskMutations>;
};

export type OffsetPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};
