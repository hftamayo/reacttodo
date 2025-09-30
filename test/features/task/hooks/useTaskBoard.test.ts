/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskBoard } from '../../../../src/features/task/hooks/useTaskBoard';

// Mock envvars to avoid import.meta issues
jest.mock('../../../../src/shared/utils/envvars', () => ({
  EXECUTION_MODE: 'test',
}));

// Mock sub-hooks used by useTaskBoard
const mockUsePaginationState = jest.fn();
const mockUseLazyLoad = jest.fn();
const mockUseTaskDataFetcher = jest.fn();
const mockUseTaskStatsCalculator = jest.fn();
const mockUseTaskPagination = jest.fn();

jest.mock('../../../../src/shared/services/redux/hooks/usePaginationState', () => ({
  usePaginationState: (...args: any[]) => mockUsePaginationState(...args),
}));
jest.mock('../../../../src/shared/services/lazyloading/hooks/useLazyLoad', () => ({
  useLazyLoad: () => mockUseLazyLoad(),
}));
jest.mock('../../../../src/features/task/hooks/composition/useTaskDataFetcher', () => ({
  useTaskDataFetcher: (...args: any[]) => mockUseTaskDataFetcher(...args),
}));
jest.mock('../../../../src/features/task/hooks/composition/useTaskStatsCalculator', () => ({
  useTaskStatsCalculator: (...args: any[]) => mockUseTaskStatsCalculator(...args),
}));
jest.mock('../../../../src/features/task/hooks/composition/useTaskPagination', () => ({
  useTaskPagination: (...args: any[]) => mockUseTaskPagination(...args),
}));

const Host: React.FC<{ onReady: (h: ReturnType<typeof useTaskBoard>) => void }> = ({ onReady }) => {
  const h = useTaskBoard();
  React.useEffect(() => onReady(h), [h, onReady]);
  return null;
};

describe('useTaskBoard (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePaginationState.mockReturnValue({ page: 1, limit: 10, setPage: jest.fn() });
    mockUseLazyLoad.mockReturnValue({ ref: { current: null }, shouldFetch: true });
    mockUseTaskDataFetcher.mockReturnValue({
      tasks: [{ id: 1, title: 'A', description: 'd', done: false, owner: 'u' }],
      pagination: { currentPage: 1, totalPages: 3, totalCount: 15, limit: 10, order: 'desc', hasMore: true, hasPrev: false, isFirstPage: true, isLastPage: false },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseTaskStatsCalculator.mockReturnValue({ total: 15, completed: 0, remaining: 15, lastUpdated: 'now' });
    mockUseTaskPagination.mockReturnValue({ setCurrentPage: jest.fn() });
  });

  it('aggregates data, stats, loading, actions, error, and lazyLoad (AAA)', async () => {
    // Arrange
    let state: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { state = h; } }));
    });

    // Assert
    expect(state.data.tasks).toHaveLength(1);
    expect(state.data.pagination.totalPages).toBe(3);
    expect(state.stats.total).toBe(15);
    expect(state.loading.isLoading).toBe(false);
    expect(state.loading.isFetching).toBe(false);
    expect(state.error).toBeNull();
    expect(state.lazyLoad.shouldFetch).toBe(true);
    expect(state.actions.setCurrentPage).toBeDefined();
    expect(state.actions.refetch).toBeDefined();
  });

  it('proxies setCurrentPage and refetch (AAA)', async () => {
    // Arrange
    const setCurrentPage = jest.fn();
    const refetch = jest.fn();
    mockUseTaskPagination.mockReturnValueOnce({ setCurrentPage });
    mockUseTaskDataFetcher.mockReturnValueOnce({
      tasks: [],
      pagination: { currentPage: 1, totalPages: 1, totalCount: 0, limit: 10, order: 'desc', hasMore: false, hasPrev: false, isFirstPage: true, isLastPage: true },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch,
    });

    let state: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { state = h; } }));
    });

    // Act
    state.actions.setCurrentPage(2);
    state.actions.refetch();

    // Assert
    expect(setCurrentPage).toHaveBeenCalledWith(2);
    expect(refetch).toHaveBeenCalled();
  });
});


