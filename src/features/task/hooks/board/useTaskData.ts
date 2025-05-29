import { useMemo } from 'react';
import { useTaskQueries } from '../useTaskQueries';
import { PaginationParams, PaginationMetadata } from '@/shared/types/api.type';

export const useTaskData = (paginationParams: PaginationParams) => {
  const { page, limit } = paginationParams;

  const { data, error, isLoading, refetch, isFetching } =
    useTaskQueries.getTasks({ page, limit });

  // Extract and memoize tasks array
  const tasks = useMemo(() => {
    if (isLoading || !data?.data?.tasks) return [];
    return data.data.tasks;
  }, [data, isLoading]);

  // Calculate pagination metadata
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
      hasMore: currentPage < totalPages,
      hasPrev: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages,
    };
  }, [data?.data?.pagination, page, limit]);

  return {
    tasks,
    pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    data,
  };
};
