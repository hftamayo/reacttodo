import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { TaskData, ApiResponse } from '../../../shared/types/api.type';

interface GetTasksParams
  extends Partial<UseQueryOptions<ApiResponse<TaskData>, Error>> {
  enabled?: boolean;
  page: number;
  limit: number;
  forceRefresh?: boolean;
}

export const useTaskQueries = {
  getTasks: ({
    enabled = true,
    page,
    limit,
    forceRefresh = false,
    ...options
  }: GetTasksParams) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks', { page, limit }],
      queryFn: async () => {
        try {
          return await taskService.fetchTasks({
            page,
            limit,
            forceRefresh,
          });
        } catch (error) {
          console.error('Task fetch error:', error);
          throw new Error('Unable to load tasks. Please try again later.');
        }
      },
      enabled,
      // For HTTP cached responses, we can use a longer staleTime
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Let's rely on our HTTP caching for refetching
      refetchOnWindowFocus: !forceRefresh,
      refetchOnMount: !forceRefresh,
      retry: 2,
      retryDelay: 1000,
      ...options, // Allow overriding any option
    }),

  getTask: (
    id: number,
    options?: Partial<UseQueryOptions<ApiResponse<TaskData>, Error>>
  ) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['task', id],
      queryFn: () => taskService.fetchTask(id),
      enabled: !!id,
      // For individual tasks, we can use a longer staleTime as well
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...(options || {}),
    }),
};
