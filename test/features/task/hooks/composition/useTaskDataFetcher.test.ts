/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskDataFetcher } from '../../../../../src/features/task/hooks/composition/useTaskDataFetcher';
import { ApiResponse } from '../../../../../src/shared/types/api.type';

// Mock useTaskQueries
const mockGetTasks = jest.fn();
jest.mock('../../../../../src/features/task/hooks/core/useTaskQueries', () => ({
  useTaskQueries: {
    getTasks: (...args: any[]) => mockGetTasks(...args),
  },
}));

type HookState = ReturnType<typeof useTaskDataFetcher>;

const Host: React.FC<{ params: { page: number; limit: number }; onReady: (s: HookState) => void }> = ({ params, onReady }) => {
  const s = useTaskDataFetcher(params as any);
  React.useEffect(() => onReady(s), [s, onReady]);
  return null;
};

describe('useTaskDataFetcher (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps query data to tasks and pagination (AAA)', async () => {
    // Arrange
    const params = { page: 2, limit: 10 };
    const apiResp: ApiResponse<any> = {
      code: 200,
      resultMessage: 'OK',
      data: {
        tasks: [{ id: 1, title: 'A', description: 'd', done: false, owner: 'u' }],
        pagination: {
          currentPage: 2,
          totalPages: 5,
          totalCount: 15,
          limit: 10,
          order: 'asc',
        },
      },
    };

    const refetch = jest.fn();
    mockGetTasks.mockReturnValue({ data: apiResp, isLoading: false, isFetching: true, error: null, refetch });

    let state: any;
    await act(async () => {
      render(React.createElement(Host, { params, onReady: (s: any) => { state = s; } }));
    });

    // Assert
    expect(state.tasks).toEqual(apiResp.data.tasks);
    expect(state.pagination).toEqual({
      currentPage: 2,
      totalPages: 5,
      totalCount: 15,
      limit: 10,
      order: 'asc',
      hasMore: true,
      hasPrev: true,
      isFirstPage: false,
      isLastPage: false,
    });
    expect(state.isLoading).toBe(false);
    expect(state.isFetching).toBe(true);

    // refetch proxy
    state.refetch();
    expect(refetch).toHaveBeenCalled();
  });

  it('returns empty tasks while loading and falls back pagination fields (AAA)', async () => {
    // Arrange
    const params = { page: 1, limit: 25 };
    mockGetTasks.mockReturnValue({ data: undefined, isLoading: true, isFetching: false, error: null, refetch: jest.fn() });

    let state: any;
    await act(async () => {
      render(React.createElement(Host, { params, onReady: (s: any) => { state = s; } }));
    });

    // Assert
    expect(state.tasks).toEqual([]);
    expect(state.pagination.currentPage).toBe(1);
    expect(state.pagination.totalPages).toBe(1);
    expect(state.pagination.totalCount).toBe(0);
    expect(state.pagination.limit).toBe(25);
    expect(state.pagination.order).toBe('desc');
    expect(state.pagination.isFirstPage).toBe(true);
    expect(state.pagination.hasPrev).toBe(false);
  });

  it('exposes error when query returns error (AAA)', async () => {
    // Arrange
    const params = { page: 1, limit: 10 };
    const error = new Error('boom');
    mockGetTasks.mockReturnValue({ data: undefined, isLoading: false, isFetching: false, error, refetch: jest.fn() });

    let state: any;
    await act(async () => {
      render(React.createElement(Host, { params, onReady: (s: any) => { state = s; } }));
    });

    // Assert
    expect(state.error).toBe(error);
  });
});





