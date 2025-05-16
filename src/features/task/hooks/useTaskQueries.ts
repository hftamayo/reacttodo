import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  TaskData,
  ApiResponse,
  CursorParams,
} from '../../../shared/types/api.type';

interface GetTasksParams extends CursorParams {
  enabled: boolean;
}

export const useTaskQueries = {
  getTasks: ({ enabled, limit, cursor }: GetTasksParams) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['tasks', { limit, cursor }],
      queryFn: async () => {
        try {
          const response = await taskService.fetchTasks({ limit, cursor });
          return response;
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
    } as UseQueryOptions<ApiResponse<TaskData>, Error>),

  getTask: (id: number) =>
    useQuery<ApiResponse<TaskData>, Error>({
      queryKey: ['task', id],
      queryFn: () => taskService.fetchTask(id),
      enabled: !!id,
    }),
};
