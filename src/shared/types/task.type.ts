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

export type TaskCardProps = TaskProps & {
  onClose?: () => void;
};

export type TaskUpdateProps = {
  initialData: TaskProps;
  onCancel: () => void;
  onUpdateTask: (task: TaskProps) => Promise<void>;
};

export type UseUpdateTaskProps = {
  initialData: TaskUpdateProps['initialData'];
  onSuccess?: () => void;
  onUpdateTask: TaskUpdateProps['onUpdateTask'];
};
