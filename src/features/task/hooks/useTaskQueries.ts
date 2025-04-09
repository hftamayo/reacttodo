import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { TaskData, ApiResponse } from '../../../shared/types/api.type';

export const useTaskQueries = {
  getTasks: (enabled: boolean) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks'],
      queryFn: taskService.fetchTasks,
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }),

  getTask: (id: string) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['task', id],
      queryFn: () => taskService.fetchTask(id),
    }),
};
