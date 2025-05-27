import { useQuery } from '@tanstack/react-query';
import { taskOps } from '@/shared/services/api/apiClient';
import { taskKeys } from './queryKeys';
import { PaginationParams } from '@/shared/types/api.type';

export const taskQueryKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskQueryKeys.all, 'list'] as const,
  list: (filters: PaginationParams) =>
    [...taskQueryKeys.lists(), filters] as const,
  details: () => [...taskQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...taskQueryKeys.details(), id] as const,
};

export const useTaskQueries = {
  getTasks: (params: PaginationParams) =>
    useQuery({
      queryKey: taskKeys.list(params),
      queryFn: () => taskOps.getTasks(params),
    }),

  getTask: (id: number) =>
    useQuery({
      queryKey: taskKeys.detail(id),
      queryFn: () => taskOps.getTask(id),
      enabled: !!id,
    }),
};
