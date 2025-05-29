import { queryClient } from '@/shared/services/cache/queryClient';
import { taskOps } from '@/shared/services/api/apiClient';
import { taskKeys } from './queryKeys';
import { PaginationParams } from '@/shared/types/api.type';

export const useTaskPrefetching = () => {
  // Prefetch a page of tasks for smooth pagination
  const prefetchTasksPage = async (params: PaginationParams) => {
    await queryClient.prefetchQuery({
      queryKey: taskKeys.list(params),
      queryFn: () => taskOps.getTasks(params),
    });
  };

  return {
    prefetchTasksPage,
  };
};
