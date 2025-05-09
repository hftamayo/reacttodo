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

export type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  owner: number;
  onClose?: () => void;
};

export type TaskCardFormProps = {
  initialData: {
    id: number;
    title: string;
    description: string;
    done: boolean;
    owner: number;
  };
  onCancel: () => void;
  onSubmit: (values: TaskProps) => void;
};
