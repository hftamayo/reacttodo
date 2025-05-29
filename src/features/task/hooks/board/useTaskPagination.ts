import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../queryKeys';
import { useTaskPrefetching } from '../useTaskPreFetching';
import { PaginationMetadata } from '@/shared/types/api.type';

export const useTaskPagination = (
  page: number,
  limit: number,
  pagination: PaginationMetadata,
  isLoading: boolean,
  setPage: (page: number) => void
) => {
  const queryClient = useQueryClient();
  const { prefetchTasksPage } = useTaskPrefetching();

  // Smart page change with prefetching
  const setCurrentPage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > (pagination.totalPages || 1)) return;

      // Check if the new page will be empty
      const newPageData = queryClient.getQueryData(
        taskKeys.list({ page: newPage, limit })
      );

      if (!newPageData) {
        // Prefetch the page if not in cache
        prefetchTasksPage({ page: newPage, limit });
      }

      // Update the pagination state
      setPage(newPage);
    },
    [pagination.totalPages, queryClient, limit, prefetchTasksPage, setPage]
  );

  // Prefetch adjacent pages for smoother pagination
  useEffect(() => {
    if (pagination.hasMore && !isLoading) {
      prefetchTasksPage({ page: page + 1, limit });
    }

    if (pagination.hasPrev && !isLoading) {
      prefetchTasksPage({ page: page - 1, limit });
    }
  }, [
    pagination.hasMore,
    pagination.hasPrev,
    page,
    limit,
    isLoading,
    prefetchTasksPage,
  ]);

  return { setCurrentPage };
};
