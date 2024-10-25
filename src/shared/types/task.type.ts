export type TaskProps = {
  id: string;
  name: string;
  complete: boolean;
};

export type AddTaskProps = Pick<TaskProps, 'name'>;
