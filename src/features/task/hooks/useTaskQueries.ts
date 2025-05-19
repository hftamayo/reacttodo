import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  CursorParams,
  OffsetParams,
  TaskData,
  ApiResponse,
} from '../../../shared/types/api.type';

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
            const cursorParams: CursorParams = {
              type: 'cursor',
              limit,
              cursor,
            };
            return await taskService.fetchTasksWithCursor(cursorParams);
          } else {
            const offsetParams: OffsetParams = {
              type: 'offset',
              page: page ?? 1,
              limit,
            };
            return await taskService.fetchTasksWithOffset(offsetParams);
          }
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
