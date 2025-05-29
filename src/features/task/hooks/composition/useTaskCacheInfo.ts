import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../core/queryKeys';

export const useTaskCacheInfo = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const queryState = queryClient.getQueryState(
      taskKeys.list({ page, limit })
    );

    const now = Date.now();
    const lastFetched = queryState?.dataUpdatedAt ?? now;
    const staleTime = 5 * 60 * 1000; // 5 minutes
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
};
