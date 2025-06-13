import { PaginationMetadata } from '@/shared/types/api.type';

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
