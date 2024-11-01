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
  return useMutation<TaskResponse, Error, TaskProps>({
    mutationFn: taskService.fetchAddTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskResponse, Error, TaskProps>(
    (updatedTask: TaskProps) => taskService.fetchUpdateTask(updatedTask),
    {
      onSuccess: (data: TaskResponse) => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        queryClient.invalidateQueries({ queryKey: ['task', data.task?.id] });
      },
    }
  );
};

const useDeleteTask = (id: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchDeleteTask(id),
  });
};

export const taskHooks = {
  useGetTasks,
  useGetTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
};
