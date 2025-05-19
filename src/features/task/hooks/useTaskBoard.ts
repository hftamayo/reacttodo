import { useEffect, useMemo } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { showError } from '@/shared/services/notification/notificationService';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import {
  CursorParams,
  CursorPagination,
  TaskBoardState,
  PaginationMetadata,
} from '@/shared/types/api.type';

export const useTaskBoard = ({
  limit,
  cursor,
}: CursorParams): TaskBoardState => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = useTaskQueries.getTasks({
    enabled: shouldFetch,
    paginationType: 'cursor',
    limit,
    cursor,
  });
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');
  const mutations = useTaskMutations();

  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  const { pagination, stats } = useMemo(() => {
    const paginationData = data?.data?.pagination as CursorPagination;

    return {
      pagination: {
        type: 'cursor',
        limit: paginationData?.limit ?? 5,
        totalCount: paginationData?.totalCount ?? 0,
        hasMore: paginationData?.hasMore ?? false,
        currentPage: paginationData?.currentPage ?? 1,
        totalPages: paginationData?.totalPages ?? 1,
        order: paginationData?.order ?? 'desc',
        nextCursor: paginationData?.nextCursor ?? null,
        prevCursor: paginationData?.prevCursor ?? null,
      } as CursorPagination,
      stats: {
        total: paginationData?.totalCount ?? 0,
        completed: tasks.filter((task) => task.done).length,
      },
    };
  }, [data, tasks]);

  return {
    ref,
    tasks,
    isLoading,
    error,
    pagination,
    taskStats: stats,
    mutations,
  };
};
