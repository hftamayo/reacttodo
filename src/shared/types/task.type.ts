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

export type TaskBaseProps = {
  onClose?: () => void;
};

// Props for UpdateTaskCard component
export type TaskCardProps = TaskProps &
  TaskBaseProps & {
    onUpdateTask?: (task: TaskProps) => Promise<void>;
  };

// Props for the UpdateTaskForm component
export type TaskUpdateProps = {
  initialData: TaskProps;
  onCancel: () => void;
  onUpdateTask: (task: TaskProps) => Promise<void>;
};

// Props for the useTaskUpdate hook
export type UseUpdateTaskProps = {
  initialData: TaskProps;
  onSuccess?: () => void;
  onUpdateTask: (task: TaskProps) => Promise<void>;
};
