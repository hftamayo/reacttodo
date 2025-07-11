import { PaginationParams } from '@/shared/types/utils/pagination.type';

export const taskKeys = {
  // Base key
  all: ['tasks'] as const,
  tasks: () => taskKeys.all,

  // List-related keys
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: PaginationParams) =>
    [
      ...taskKeys.lists(),
      { page: filters.page, limit: filters.limit },
    ] as const,

  // Detail-related keys
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: number) => [...taskKeys.details(), id] as const,
};
