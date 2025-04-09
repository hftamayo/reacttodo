import { useEffect, useMemo } from 'react';
import { useLazyLoad } from '@/shared/services/lazyloading/hooks/useLazyLoad';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { showError } from '@/shared/services/notification/notificationService';
import { useTaskQueries } from './useTaskQueries';
import { useTaskMutations } from './useTaskMutations';

export const useTaskBoard = () => {
  const { ref, shouldFetch } = useLazyLoad();
  const { data, error, isLoading } = useTaskQueries.getTasks(shouldFetch);
  const { text: errorMessage = 'An error occurred' } =
    useTranslation('errorComponent');
  const mutations = useTaskMutations();

  const tasks = useMemo(() => {
    return data?.data.tasks ? Array.from(data.data.tasks.values()) : [];
  }, [data]);

  const taskStats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.done).length,
    }),
    [tasks]
  );

  useEffect(() => {
    if (error) {
      showError('unexpected UI error', errorMessage);
    }
  }, [error, errorMessage]);

  return {
    ref,
    tasks,
    error,
    isLoading,
    errorMessage,
    taskStats,
    mutations,
  };
};
