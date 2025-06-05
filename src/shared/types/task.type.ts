export type FullTask = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  owner: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskProps = Omit<FullTask, 'createdAt' | 'updatedAt'>;

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
