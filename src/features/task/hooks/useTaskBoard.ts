import { useMemo } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { showError } from '@/shared/services/notification/notificationService';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import { PaginationParams, TaskBoardState } from '@/shared/types/api.type';

export const useTaskBoard = ({
  page,
  limit,
}: PaginationParams): TaskBoardState => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = useTaskQueries.getTasks({
    enabled: shouldFetch,
    page,
    limit,
  });
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');
  const mutations = useTaskMutations();

  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  const { pagination, stats } = useMemo(() => {
    const paginationData = data?.data?.pagination;

    return {
      pagination: {
        limit: paginationData?.limit ?? 5,
        totalCount: paginationData?.totalCount ?? 0,
        currentPage: paginationData?.currentPage ?? 1,
        totalPages: paginationData?.totalPages ?? 1,
        order: paginationData?.order ?? 'desc',
      },
      stats: {
        total: paginationData?.totalCount ?? 0,
        completed: tasks.filter((task) => task.done).length,
      },
    };
  }, [data, tasks]);

  return {
    tasks,
    isLoading,
    error,
    pagination,
    taskStats: stats,
    mutations,
  };
};
