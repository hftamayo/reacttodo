import { useState, useCallback } from 'react';
import { PaginationParams } from '@/shared/types/api.type';
import { PAGINATION_LIMIT } from '@/shared/utils/envvars';

export const usePaginationState = (
  initialParams?: Partial<PaginationParams>
) => {
  const [paginationState, setPaginationState] = useState({
    page: initialParams?.page ?? 1,
    limit: initialParams?.limit ?? PAGINATION_LIMIT,
  });

  const setPage = useCallback((newPage: number) => {
    if (newPage < 1) return;
    setPaginationState((prev) => ({ ...prev, page: newPage }));
  }, []);

  const setLimit = useCallback((newLimit: number) => {
    if (newLimit < 1) return;
    setPaginationState((prev) => ({ ...prev, page: 1, limit: newLimit }));
  }, []);

  return {
    ...paginationState,
    setPage,
    setLimit,
  };
};
