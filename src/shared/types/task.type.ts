export type TaskProps = {
  id: string;
  name: string;
  complete: boolean;
};

export type AddTask = Pick<TaskProps, 'name'>;
