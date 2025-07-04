import { useEffect, useCallback } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTaskMutations } from './core/useTaskBoardMutations';
import { usePaginationState } from '@/shared/services/redux/hooks/usePaginationState';
import { useTaskData } from './composition/useTaskData';
import { useTaskStats } from './composition/useTaskStats';
import { useTaskPagination } from './composition/useTaskPagination';
import { PaginationParams } from '@/shared/types/api.type';
import { EXECUTION_MODE } from '@/shared/utils/envvars';

export const useTaskBoard = (initialParams?: Partial<PaginationParams>) => {
  // Manage pagination state
  const paginationState = usePaginationState(initialParams);
  const { page, limit, setPage } = paginationState;

  // Get lazy loading reference
  const { ref, shouldFetch } = useLazyLoad();

  // Fetch task data
  const { tasks, pagination, isLoading, isFetching, error, refetch, data } =
    useTaskData({ page, limit });

  // Calculate task statistics
  const taskStats = useTaskStats(
    tasks,
    pagination.totalCount,
    data?.data?.lastModified
  );

  // Access mutations
  const mutations = useTaskMutations({ page, limit });

  // Setup pagination with prefetching
  const { setCurrentPage } = useTaskPagination(
    page,
    limit,
    pagination,
    isLoading,
    setPage
  );

  const memoizedRefetch = useCallback(() => {
    return refetch();
  }, [refetch]);

  // Development logging
  useEffect(() => {
    if (EXECUTION_MODE === 'development') {
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
    // Data
    tasks,
    pagination,
    taskStats,

    // State
    isLoading,
    isFetching,
    error,

    // Actions
    mutations,
    setCurrentPage,
    refetch: memoizedRefetch,
    ref,
    shouldFetch,
  };
};
