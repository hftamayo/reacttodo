import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { TaskData, ApiResponse } from '../../../shared/types/api.type';

export const useTaskQueries = {
  getTasks: (enabled: boolean) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks'],
      queryFn: async () => {
        const response = await taskService.fetchTasks();
        return response;
      },
      enabled,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      retryDelay: 1000,
    } as UseQueryOptions<ApiResponse<TaskData>, Error>),

  getTask: (id: number) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['task', id],
      queryFn: () => taskService.fetchTask(id),
      enabled: !!id,
    }),
};
