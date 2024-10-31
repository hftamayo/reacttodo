import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { taskService } from './taskService';
import { TaskProps, TaskResponse } from '../../../types/task.type';

const useGetTasks = () => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['tasks'],
    queryFn: taskService.fetchTasks,
  });
};

const useGetTask = (id: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchTask(id),
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskResponse, Error, TaskProps>(
    (newTask: TaskProps) => taskService.fetchAddTask(newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    }
  );
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskProps, Error, TaskProps>(taskService.fetchUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskResponse, Error, string>(taskService.fetchDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const taskHooks = {
  useGetTasks,
  useGetTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
};
