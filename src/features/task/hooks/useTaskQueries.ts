import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  PaginationParams,
  TaskData,
  ApiResponse,
} from '../../../shared/types/api.type';

interface GetTasksParams {
  enabled: boolean;
  page: number;
  limit: number;
}
export const useTaskQueries = {
  getTasks: ({ enabled, page, limit }: GetTasksParams) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks', { page, limit }],
      queryFn: async () => {
        try {
          return await taskService.fetchTasksWithOffset({ page, limit });
        } catch (error) {
          console.error('Task fetch error:', error);
          throw new Error('Unable to load tasks. Please try again later.');
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
