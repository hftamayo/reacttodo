import { useTaskMutations } from '@/features/task/hooks/core/useTaskMutations';
import { TaskProps } from './domains/task.type';

export type CrudOperation = 'create' | 'read' | 'update' | 'delete' | 'toggle';
export type EntityType = 'task' | 'user' | 'setting';

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

export type PaginationParams = {
  page: number;
  limit: number;
  _t?: number; // Optional delay for testing purposes
};

export type TaskStatsProps = {
  total: number;
  completed: number;
  lastUpdated?: string;
};

export type TaskBoardState = {
  tasks: TaskProps[];
  isLoading: boolean;
  error: Error | null;
  pagination: PaginationMetadata;
  taskStats: TaskStatsProps;
  mutations: ReturnType<typeof useTaskMutations>;
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
