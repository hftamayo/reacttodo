import { useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import { useTaskPrefetching } from './useTaskPreFetching';
import { taskKeys } from './queryKeys';
import {
  PaginationParams,
  TaskBoardState,
  TaskStats,
  PaginationMetadata,
} from '@/shared/types/api.type';

export const useTaskBoard = ({
  page,
  limit,
}: PaginationParams): TaskBoardState => {
  // Get references for lazy loading
  const { ref, shouldFetch } = useLazyLoad();

  // Access translation service
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');

  // Access query client for cache information
  const queryClient = useQueryClient();

  // Access task data fetching hooks
  const { data, error, isLoading, refetch, isFetching } =
    useTaskQueries.getTasks({
      page,
      limit,
      cacheOptions: {},
    });

  // Access task mutation hooks
  const mutations = useTaskMutations();

  // Access prefetching functionality
  const { prefetchTasksPage } = useTaskPrefetching();

  // Extract and memoize tasks array
  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  // Calculate pagination state with all necessary properties
  const pagination = useMemo((): PaginationMetadata => {
    const paginationData = data?.data?.pagination;
    const currentPage = paginationData?.currentPage ?? page;
    const totalPages = paginationData?.totalPages ?? 1;

    return {
      currentPage,
      totalPages,
      totalCount: paginationData?.totalCount ?? 0,
      limit: paginationData?.limit ?? limit,
      order: paginationData?.order ?? 'desc',
      // Adding the additional required properties
      hasMore: currentPage < totalPages,
      hasPrev: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages,
    };
  }, [data?.data?.pagination, page, limit]);

  // Calculate task statistics
  const taskStats = useMemo((): TaskStats => {
    const totalTasks = pagination.totalCount;
    const completedTasks = tasks.filter((task) => task.done).length;

    return {
      total: totalTasks,
      completed: completedTasks,
      lastUpdated: data?.data?.lastModified // Using lastModified from TaskData
        ? new Date(data.data.lastModified).toLocaleString()
        : new Date().toLocaleString(),
    };
  }, [tasks, pagination.totalCount, data?.data?.lastModified]);

  // Get cache information from React Query
  const cacheInfo = useMemo(() => {
    const queryState = queryClient.getQueryState(
      taskKeys.list({ page, limit })
    );

    // Calculate a simulated remainingTTL for compatibility
    const now = Date.now();
    const lastFetched = queryState?.dataUpdatedAt ?? now;
    const staleTime = 5 * 60 * 1000; // 5 minutes in milliseconds (from your queryClient config)
    const elapsedTime = now - lastFetched;
    const remainingTTL = Math.max(
      0,
      Math.floor((staleTime - elapsedTime) / 1000)
    );

    return {
      isCached:
        queryState?.status === 'success' && !!queryState?.dataUpdateCount,
      lastFetched: queryState?.dataUpdatedAt
        ? new Date(queryState.dataUpdatedAt).toLocaleString()
        : 'Not cached',
      remainingTTL: remainingTTL,
    };
  }, [queryClient, page, limit]);

  // Prefetch adjacent pages for smoother pagination
  useEffect(() => {
    // Prefetch next page if not on last page
    if (pagination.hasMore && !isLoading) {
      prefetchTasksPage({ page: page + 1, limit });
    }

    // Prefetch previous page if not on first page
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

  // Development logging
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('TaskBoard State:', {
        page,
        limit,
        totalPages: pagination.totalPages,
        totalCount: pagination.totalCount,
        isLoading,
        isFetching,
        error: error ? 'Error fetching data' : undefined,
        taskCount: tasks.length,
        hasMore: pagination.hasMore,
        hasPrev: pagination.hasPrev,
      });
    }
  }, [page, limit, pagination, isLoading, isFetching, error, tasks.length]);

  return {
    tasks,
    isLoading,
    error, // error is already correctly typed
    pagination,
    taskStats,
    mutations,
    cacheInfo,
    refetch: () => {
      refetch();
    },
    ref: ref as React.RefObject<HTMLElement>, // Cast to match the expected type
  };
};
