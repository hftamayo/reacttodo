// paginationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalItems: 0,
  isLoading: false,
  error: null,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      // Boundary check
      const page = action.payload;
      if (page < 1) {
        state.currentPage = 1;
      } else if (page > state.totalPages && state.totalPages > 0) {
        state.currentPage = state.totalPages;
      } else {
        state.currentPage = page;
      }
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      // Reset to page 1 when changing page size
      state.currentPage = 1;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
      // Ensure current page is still valid
      if (state.currentPage > action.payload) {
        state.currentPage = Math.max(1, action.payload);
      }
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Handle edge case: last item on page deletion
    handleItemDeletion: (state) => {
      if (
        state.currentPage > 1 &&
        state.totalItems % state.pageSize === 1 &&
        state.totalItems > 0
      ) {
        // If we deleted the last item on the page, go to previous page
        state.currentPage--;
      }
    },
    // Reset pagination (for filters, searches, etc.)
    resetPagination: (state) => {
      state.currentPage = 1;
      // Keep other settings like pageSize
    },
  },
});

export default paginationSlice.reducer;
