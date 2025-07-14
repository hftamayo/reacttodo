export type PaginationMetadata = {
  limit: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  order: 'desc' | 'asc';
  hasMore: boolean;
  hasPrev: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export type PaginationParams = {
  page: number;
  limit: number;
  _t?: number; // Optional delay for testing purposes
};

export type OffsetPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  // Enhanced pagination flags to improve UI controls
  isFirstPage?: boolean;
  isLastPage?: boolean;
  hasMore?: boolean;
  hasPrev?: boolean;
  // Optional loading state
  isLoading?: boolean;
};
