import { useEffect, useMemo } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { showError } from '@/shared/services/notification/notificationService';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';
import { CursorParams, TaskBoardState } from '@/shared/types/api.type';

export const useTaskBoard = ({
  limit,
  cursor,
}: CursorParams): TaskBoardState => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = useTaskQueries.getTasks({
    enabled: shouldFetch,
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

  const { pagination, stats } = useMemo(
    () => ({
      pagination: {
        hasMore: data?.data?.pagination?.hasMore ?? false,
        nextCursor: data?.data?.pagination?.nextCursor ?? null,
      },
      stats: {
        total: data?.data?.pagination?.totalCount ?? 0,
        completed: tasks.filter((task) => task.done).length,
      },
    }),
    [data, tasks]
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
