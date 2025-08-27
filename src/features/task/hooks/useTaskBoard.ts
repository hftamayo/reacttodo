import { useEffect, useCallback } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { usePaginationState } from '@/shared/services/redux/hooks/usePaginationState';
import { useTaskDataFetcher } from './composition/useTaskDataFetcher';
import {
  useTaskStatsCalculator,
  TaskStatsCalculatorReturn,
} from './composition/useTaskStatsCalculator';
import { useTaskPagination } from './composition/useTaskPagination';
import {
  PaginationParams,
  PaginationMetadata,
} from '@/shared/types/utils/pagination.type';
import { TaskProps } from '@/shared/types/domains/task.type';
import { EXECUTION_MODE } from '@/shared/utils/envvars';

export type UseTaskBoardReturn = {
  // Data
  data: {
    tasks: TaskProps[];
    pagination: PaginationMetadata;
  };
  // Statistics
  stats: TaskStatsCalculatorReturn;
  // Loading states
  loading: {
    isLoading: boolean;
    isFetching: boolean;
  };
  // Actions
  actions: {
    setCurrentPage: (page: number) => void;
    refetch: () => void;
  };
  // Error handling
  error: Error | null;
  // Lazy loading
  lazyLoad: {
    ref: React.RefObject<HTMLDivElement | null>;
    shouldFetch: boolean;
  };
};

export const useTaskBoard = (
  initialParams?: Partial<PaginationParams>
): UseTaskBoardReturn => {
  // Manage pagination state
  const paginationState = usePaginationState(initialParams);
  const { page, limit, setPage } = paginationState;

  // Get lazy loading reference
  const { ref, shouldFetch } = useLazyLoad();

  // Fetch task data
  const { tasks, pagination, isLoading, isFetching, error, refetch } =
    useTaskDataFetcher({ page, limit });

  // Calculate task statistics
  const stats = useTaskStatsCalculator(tasks, pagination.totalCount);

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
        stats: {
          total: stats.total,
          completed: stats.completed,
          remaining: stats.remaining,
        },
      });
    }
  }, [
    page,
    limit,
    pagination,
    isLoading,
    isFetching,
    error,
    tasks.length,
    stats,
  ]);

  return {
    // Data
    data: {
      tasks,
      pagination,
    },
    // Statistics
    stats,
    // Loading states
    loading: {
      isLoading,
      isFetching,
    },
    // Actions
    actions: {
      setCurrentPage,
      refetch: memoizedRefetch,
    },
    // Error handling
    error,
    // Lazy loading
    lazyLoad: {
      ref,
      shouldFetch,
    },
  };
};
