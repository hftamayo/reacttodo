export type FullTask = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskProps = Omit<FullTask, 'createdAt' | 'updatedAt'>;

export type TaskCardProps = {
  title: string;
  description: string;
  status: boolean;
  onClose?: () => void;
};

export type TaskCardFormProps = {
  onCancel: () => void;
  onSubmit: (values: TaskProps) => void;
};
