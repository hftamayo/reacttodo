/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskPagination } from '../../../../../src/features/task/hooks/composition/useTaskPagination';

// Mock debounce to run immediately
jest.mock('lodash/debounce', () => (fn: any) => fn);

// Mock useTaskPrefetching
const mockPrefetch = jest.fn();
jest.mock('../../../../../src/features/task/hooks/core/useTaskPreFetching', () => ({
  useTaskPrefetching: () => ({ prefetchTasksPage: mockPrefetch }),
}));

// Mock useQueryClient
const mockGetQueryData = jest.fn();
jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: () => ({ getQueryData: mockGetQueryData }),
  };
});

type PaginationMeta = {
  totalPages: number;
};

const Host: React.FC<{
  page: number;
  limit: number;
  pagination: PaginationMeta;
  isLoading: boolean;
  onReady: (api: ReturnType<typeof useTaskPagination>) => void;
}> = ({ page, limit, pagination, isLoading, onReady }) => {
  const api = useTaskPagination(page, limit, pagination as any, isLoading, jest.fn());
  React.useEffect(() => onReady(api), [api, onReady]);
  return null;
};

describe('useTaskPagination (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setCurrentPage validates bounds, prefetches when cache missing, updates page (AAA)', async () => {
    // Arrange
    const setPage = jest.fn();
    const pagination = { totalPages: 5 } as any;
    mockGetQueryData.mockReturnValueOnce(undefined); // for page 3

    let api: any;
    await act(async () => {
      render(
        React.createElement(
          ({ children }: any) => children,
          {},
          React.createElement(() => {
            const a = useTaskPagination(2, 10, pagination, false, setPage);
            React.useEffect(() => {
              api = a;
            }, [a]);
            return null;
          })
        )
      );
    });

    // Act: valid new page
    await act(async () => {
      api.setCurrentPage(3);
    });

    // Assert
    expect(mockGetQueryData).toHaveBeenCalled();
    expect(mockPrefetch).toHaveBeenCalledWith({ page: 3, limit: 10 });
    expect(setPage).toHaveBeenCalledWith(3);

    // Act: invalid bounds
    await act(async () => {
      api.setCurrentPage(0);
      api.setCurrentPage(6);
    });
    expect(setPage).toHaveBeenCalledTimes(1); // unchanged beyond valid call
  });

  it('effect prefetches next/prev if not cached, skips when cached or loading (AAA)', async () => {
    // Arrange: not cached next/prev
    mockGetQueryData.mockReturnValue(undefined);
    const onReady = jest.fn();

    await act(async () => {
      render(
        React.createElement(Host, {
          page: 2,
          limit: 10,
          pagination: { totalPages: 4 },
          isLoading: false,
          onReady,
        })
      );
    });

    // Assert: prefetched next (3) and prev (1)
    expect(mockPrefetch).toHaveBeenCalledWith({ page: 3, limit: 10 });
    expect(mockPrefetch).toHaveBeenCalledWith({ page: 1, limit: 10 });

    // Arrange: cached scenario
    jest.clearAllMocks();
    mockGetQueryData.mockReturnValue({});
    await act(async () => {
      render(
        React.createElement(Host, {
          page: 3,
          limit: 10,
          pagination: { totalPages: 4 },
          isLoading: false,
          onReady,
        })
      );
    });
    expect(mockPrefetch).not.toHaveBeenCalled();

    // Arrange: loading true should skip
    jest.clearAllMocks();
    mockGetQueryData.mockReturnValue(undefined);
    await act(async () => {
      render(
        React.createElement(Host, {
          page: 2,
          limit: 10,
          pagination: { totalPages: 4 },
          isLoading: true,
          onReady,
        })
      );
    });
    expect(mockPrefetch).not.toHaveBeenCalled();
  });
});


