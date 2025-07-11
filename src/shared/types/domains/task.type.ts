import { PaginationMetadata } from '@/shared/types/utils/pagination.type';

export type FullTask = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  owner: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
};

export type AddTaskProps = Pick<
  FullTask,
  'title' | 'owner' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type TaskProps = Omit<FullTask, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TaskData = {
  tasks: TaskProps[];
  pagination: PaginationMetadata;
  etag?: string;
  lastModified?: string;
};

// Props for the UpdateTaskForm component
export type TaskUpdateProps = {
  initialData: TaskProps;
  onCancel: () => void;
  onUpdateTask: (task: TaskProps) => Promise<void>;
};

// Props for UpdateTaskCard component
export type TaskCardProps = TaskProps & {
  onClose?: () => void;
  onUpdateTask?: TaskUpdateProps['onUpdateTask'];
};

// Props for the useTaskUpdate hook
export type UseUpdateTaskProps = Pick<
  TaskUpdateProps,
  'initialData' | 'onUpdateTask'
> & {
  onSuccess?: () => void;
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

  // Error handling
  error?: Error;

  // Callbacks
  onPageChange: (page: number) => void;
  onClose: () => void;
};
