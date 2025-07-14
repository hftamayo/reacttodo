import { PaginationMetadata } from '@/shared/types/utils/pagination.type';

// ============================================================================
// CORE TASK TYPES
// ============================================================================

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

export type TaskProps = Omit<FullTask, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type AddTaskProps = Pick<
  FullTask,
  'title' | 'description' | 'owner'
>;

// ============================================================================
// TASK STATISTICS
// ============================================================================

export type TaskStats = {
  total: number;
  completed: number;
  remaining: number;
  lastUpdated: string;
};

// ============================================================================
// TASK BOARD DATA
// ============================================================================

export type TaskBoardData = {
  tasks: TaskProps[];
  pagination: PaginationMetadata;
};

// ============================================================================
// TASK BOARD UI PROPS
// ============================================================================

export type TaskBoardDataProps = {
  tasks: TaskProps[];
  pagination: PaginationMetadata & {
    completedCount: number;
  };
};

export type TaskBoardUIStateProps = {
  isLoading: boolean;
  isAdding?: boolean;
  isUpdating?: boolean;
  error?: Error;
};

export type TaskBoardCallbackProps = {
  onPageChange: (page: number) => void;
  onClose: () => void;
};

export type TaskBoardPresenterProps = TaskBoardDataProps & 
  TaskBoardUIStateProps & 
  TaskBoardCallbackProps;

// ============================================================================
// TASK FORM PROPS
// ============================================================================

export type TaskUpdateProps = {
  initialData: TaskProps;
  onCancel: () => void;
  onUpdateTask: (task: TaskProps) => Promise<void>;
  isUpdating?: boolean;
};

export type TaskCardProps = TaskProps & {
  onClose?: () => void;
  isUpdating?: boolean;
};

export type UseUpdateTaskProps = Pick<
  TaskUpdateProps,
  'initialData' | 'onUpdateTask'
> & {
  onSuccess?: () => void;
};
