import { useEffect, useMemo } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { showError } from '@/shared/services/notification/notificationService';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import { PaginationParams, TaskBoardState } from '@/shared/types/api.type';

export const useTaskBoard = ({
  currentPage,
  limit,
}: PaginationParams): TaskBoardState => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = useTaskQueries.getTasks(
    shouldFetch,
    currentPage,
    limit
  );
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');
  const mutations = useTaskMutations();

  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  const { pagination, stats } = useMemo(
    () => ({
      pagination: {
        currentPage: data?.data?.pagination?.currentPage ?? currentPage,
        totalPages: data?.data?.pagination?.totalPages ?? 1,
      },
      stats: {
        total: data?.data?.pagination?.totalCount ?? 0,
        completed: tasks.filter((task) => task.done).length,
      },
    }),
    [data, tasks, currentPage]
  );

  useEffect(() => {
    if (error) {
      showError('unexpected UI error', errorMessage);
    }
  }, [error]);

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
