import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { TaskData, ApiResponse } from '../../../shared/types/api.type';

interface GetTasksParams {
  enabled: boolean;
  paginationType: 'cursor' | 'offset';
  limit: number;
  cursor?: string | null;
  page?: number;
}
export const useTaskQueries = {
  getTasks: ({
    enabled,
    paginationType,
    limit,
    cursor,
    page,
  }: GetTasksParams) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks', { paginationType, limit, cursor, page }],
      queryFn: async () => {
        try {
          if (paginationType === 'cursor') {
            return await taskService.fetchTasksWithCursor({ limit, cursor });
          } else {
            return await taskService.fetchTasksWithOffset({
              page: page || 1,
              limit,
            });
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
          throw new Error('Failed to fetch tasks');
        }
      },
      enabled,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      retryDelay: 1000,
    }),

  getTask: (id: number) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['task', id],
      queryFn: () => taskService.fetchTask(id),
      enabled: !!id,
    }),
};
