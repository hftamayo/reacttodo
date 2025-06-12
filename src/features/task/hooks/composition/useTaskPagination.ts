import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../core/queryKeys';
import { useTaskPrefetching } from '../core/useTaskPreFetching';
import { PaginationMetadata } from '@/shared/types/api.type';
import debounce from 'lodash/debounce';

export const useTaskPagination = (
  page: number,
  limit: number,
  pagination: PaginationMetadata,
  isLoading: boolean,
  setPage: (page: number) => void
) => {
  const queryClient = useQueryClient();
  const { prefetchTasksPage } = useTaskPrefetching();
  const totalPages = pagination.totalPages ?? 1;

  // Smart page change with prefetching
  const setCurrentPage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;

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
    [totalPages, queryClient, limit, prefetchTasksPage, setPage]
  );

  const debouncedPrefetch = useCallback(
    debounce((pageNum: number, pageLimit: number) => {
      prefetchTasksPage({ page: pageNum, limit: pageLimit });
    }, 500), // Increased to 500ms for better rate limit handling
    [prefetchTasksPage]
  );

  // Unified prefetching logic - combines solution #2 (debouncing) and #3 (conditional)
  useEffect(() => {
    if (isLoading) return; // Don't prefetch while loading

    // Check next page
    if (page < totalPages) {
      const hasNextPageData = queryClient.getQueryData(
        taskKeys.list({ page: page + 1, limit })
      );

      // Only prefetch if we don't already have the data
      if (!hasNextPageData) {
        debouncedPrefetch(page + 1, limit);
      }
    }

    // Check previous page
    if (page > 1) {
      const hasPrevPageData = queryClient.getQueryData(
        taskKeys.list({ page: page - 1, limit })
      );

      // Only prefetch if we don't already have the data
      if (!hasPrevPageData) {
        debouncedPrefetch(page - 1, limit);
      }
    }
  }, [page, limit, totalPages, isLoading, queryClient, debouncedPrefetch]);

  return { setCurrentPage };
};
