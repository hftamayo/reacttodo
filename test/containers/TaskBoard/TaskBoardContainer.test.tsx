/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';

// Mock ESM-only react-error-boundary with a passthrough ErrorBoundary
jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }: any) => children,
}));

jest.mock('wouter', () => ({
  useLocation: () => [null, jest.fn()],
}));

const mockUseTaskBoard = jest.fn();
jest.mock('@/features/task/hooks/useTaskBoard', () => ({
  useTaskBoard: () => mockUseTaskBoard(),
}));

const mockUseLoading = jest.fn(() => ({ isAdding: false, isUpdating: false }));
jest.mock('@/features/task/hooks/composition/useTaskBoardLoadingStates', () => ({
  useTaskBoardLoadingStates: () => mockUseLoading(),
}));

jest.mock('@/containers/TaskBoard/TaskBoardPresenter', () => ({
  TaskBoardPresenter: (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'presenter', onClick: () => props.onPageChange(2) },
      JSON.stringify(props)
    ),
}));

jest.mock('@/shared/services/notification/notificationService', () => ({
  showError: jest.fn(),
}));

const baseData = {
  data: {
    tasks: [{ id: 1, title: 'A', description: 'a', done: false, owner: 1 }],
    pagination: {
      currentPage: 1,
      totalPages: 3,
      totalCount: 1,
      limit: 25,
      order: 'desc' as const,
      hasMore: true,
      hasPrev: false,
      isFirstPage: true,
      isLastPage: false,
    },
  },
  stats: { total: 1, completed: 0, remaining: 1, lastUpdated: 'now' },
  loading: { isLoading: false },
  actions: { setCurrentPage: jest.fn() },
  error: null,
};

describe('TaskBoardContainer (AAA)', () => {
  it('wires presenter with data and loading flags (AAA)', () => {
    // Arrange
    mockUseTaskBoard.mockReturnValue(baseData);

    // Act
    render(React.createElement(TaskBoardContainer));

    // Assert
    const presenter = screen.getByTestId('presenter');
    expect(presenter).toBeTruthy();
    const props = JSON.parse(presenter.textContent || '{}');
    expect(props.tasks.length).toBe(1);
    expect(props.pagination.currentPage).toBe(1);
    expect(props.isLoading).toBe(false);
  });

  it('calls setCurrentPage via presenter onPageChange (AAA)', async () => {
    // Arrange
    const actions = { setCurrentPage: jest.fn() };
    mockUseTaskBoard.mockReturnValue({ ...baseData, actions });

    // Act
    render(React.createElement(TaskBoardContainer));
    await userEvent.click(screen.getByTestId('presenter'));

    // Assert
    expect(actions.setCurrentPage).toHaveBeenCalledWith(2);
  });
});


