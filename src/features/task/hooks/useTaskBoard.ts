import { useMemo, useEffect } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import {
  PaginationParams,
  TaskBoardState,
  TaskStats,
} from '@/shared/types/api.type';
import { cacheService } from '@/shared/services/api/cacheService';
import { BACKEND_URL } from '@/shared/utils/envvars';

export const useTaskBoard = ({
  page,
  limit,
  forceRefresh = false,
}: PaginationParams & { forceRefresh?: boolean }): TaskBoardState => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading, refetch } = useTaskQueries.getTasks({
    enabled: shouldFetch,
    page,
    limit,
    forceRefresh,
  });
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');
  const mutations = useTaskMutations();

  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  const { pagination, stats, cacheInfo } = useMemo(() => {
    const paginationData = data?.data?.pagination;
    const cacheKey = `${BACKEND_URL}/tasks/task/list/page?page=${page}&limit=${limit}`;
    const cachedRecord = cacheService.get(cacheKey);
    const now = Date.now();

    // Calculate cache information
    const cacheTTL = cachedRecord?.ttl ?? 0;
    const cacheTimestamp = cachedRecord?.timestamp ?? 0;
    const remainingTTL = Math.max(
      0,
      Math.floor((cacheTimestamp + cacheTTL * 1000 - now) / 1000)
    );

    return {
      pagination: {
        limit: paginationData?.limit ?? 5,
        totalCount: paginationData?.totalCount ?? 0,
        currentPage: paginationData?.currentPage ?? 1,
        totalPages: paginationData?.totalPages ?? 1,
        order: paginationData?.order ?? 'desc',
        hasMore:
          (paginationData?.currentPage ?? 1) <
          (paginationData?.totalPages ?? 1),
        hasPrev: (paginationData?.currentPage ?? 1) > 1,
        isFirstPage: (paginationData?.currentPage ?? 1) === 1,
        isLastPage:
          (paginationData?.currentPage ?? 1) ===
          (paginationData?.totalPages ?? 1),
      },
      stats: {
        total: paginationData?.totalCount ?? 0,
        completed: tasks.filter((task) => task.done).length,
        pending:
          (paginationData?.totalCount ?? 0) -
          tasks.filter((task) => task.done).length,
      } as TaskStats,
      cacheInfo: {
        isCached: !!cachedRecord && remainingTTL > 0,
        lastFetched: cachedRecord
          ? new Date(cacheTimestamp).toLocaleString()
          : 'Not cached',
        remainingTTL,
      },
    };
  }, [data, tasks, page, limit]);

  // Debug pagination in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Pagination state:', {
        requestedPage: page,
        requestedLimit: limit,
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        hasMore: pagination.hasMore,
        isFirstPage: pagination.isFirstPage,
        isLastPage: pagination.isLastPage,
      });
    }
  }, [page, limit, pagination]);

  return {
    tasks,
    isLoading,
    error,
    pagination,
    taskStats: stats,
    mutations,
    refetch,
    cacheInfo,
    ref, // Expose the ref for attaching to the container element
  };
};
