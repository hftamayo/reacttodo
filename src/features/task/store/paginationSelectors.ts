import { RootState } from '@/shared/services/redux/rootReducer';

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const selectPageSize = (state: RootState) => state.pagination.pageSize;
export const selectTotalPages = (state: RootState) =>
  state.pagination.totalPages;
export const selectTotalItems = (state: RootState) =>
  state.pagination.totalItems;
export const selectIsLoading = (state: RootState) => state.pagination.isLoading;
export const selectPaginationError = (state: RootState) =>
  state.pagination.error;

// Derived selectors
export const selectIsFirstPage = (state: RootState) =>
  state.pagination.currentPage === 1;
export const selectIsLastPage = (state: RootState) =>
  state.pagination.currentPage === state.pagination.totalPages;
export const selectHasNextPage = (state: RootState) =>
  state.pagination.currentPage < state.pagination.totalPages;
export const selectHasPrevPage = (state: RootState) =>
  state.pagination.currentPage > 1;
