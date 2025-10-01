/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskBoardPresenter } from '@/containers/TaskBoard/TaskBoardPresenter';
import { TaskProps, TaskStats } from '@/shared/types/domains/task.type';

jest.mock('@/features/task/components/AddTaskForm', () => ({
  AddTaskForm: ({ isAddingTask }: any) => React.createElement('div', { 'data-testid': 'add-form' }, `adding:${isAddingTask}`),
}));

jest.mock('@/features/task/components/row/TaskRowContainer', () => ({
  TaskRowContainer: ({ task }: any) => React.createElement('li', { 'data-testid': `row-${task.id}` }, task.title),
}));

jest.mock('@/shared/components/pagination/OffsetPagination', () => ({
  OffsetPagination: ({ currentPage, totalPages, onPageChange }: any) =>
    React.createElement('button', { 'data-testid': 'pager', onClick: () => onPageChange(currentPage + 1) }, `p:${currentPage}/${totalPages}`),
}));

jest.mock('@/shared/components/ui/loading/LoadingSpinner', () => ({
  LoadingSpinner: () => React.createElement('div', { 'data-testid': 'spinner' }, 'loading'),
}));

jest.mock('@/shared/services/redux/hooks/useModalState', () => ({
  useModalState: () => ({ openModal: jest.fn() }),
}));

jest.mock('@/shared/services/notification/notificationService', () => ({
  showError: jest.fn(),
}));

const tasks: TaskProps[] = [
  { id: 1, title: 'A', description: 'a', done: false, owner: 1 },
  { id: 2, title: 'B', description: 'b', done: true, owner: 1 },
];

const stats: TaskStats = { total: 2, completed: 1, remaining: 1, lastUpdated: 'now' };

const basePagination = {
  currentPage: 1,
  totalPages: 3,
  totalCount: 2,
  limit: 25,
  order: 'desc' as const,
  isFirstPage: false,
  isLastPage: false,
  hasMore: true,
  hasPrev: false,
  completedCount: 1,
};

describe('TaskBoardPresenter (AAA)', () => {
  it('shows loading state when loading and no tasks (AAA)', () => {
    // Arrange
    render(
      React.createElement(TaskBoardPresenter, {
        tasks: [],
        pagination: { ...basePagination },
        isLoading: true,
        error: undefined,
        onPageChange: jest.fn(),
        onClose: jest.fn(),
        isAdding: false,
        isUpdating: false,
        stats,
      })
    );

    // Assert
    expect(screen.getByTestId('spinner')).toBeTruthy();
    expect(screen.getByText(/Loading tasks/)).toBeTruthy();
  });

  it('shows empty state when no tasks and not loading (AAA)', () => {
    // Arrange
    render(
      React.createElement(TaskBoardPresenter, {
        tasks: [],
        pagination: { ...basePagination },
        isLoading: false,
        error: undefined,
        onPageChange: jest.fn(),
        onClose: jest.fn(),
        isAdding: false,
        isUpdating: false,
        stats: { total: 0, completed: 0, remaining: 0, lastUpdated: 'now' },
      })
    );

    // Assert
    expect(screen.getByText(/No tasks found/)).toBeTruthy();
  });

  it('renders rows and pagination; clicking pager calls onPageChange (AAA)', async () => {
    // Arrange
    const onPageChange = jest.fn();
    render(
      React.createElement(TaskBoardPresenter, {
        tasks,
        pagination: { ...basePagination },
        isLoading: false,
        error: undefined,
        onPageChange,
        onClose: jest.fn(),
        isAdding: false,
        isUpdating: false,
        stats,
      })
    );

    // Assert rows
    expect(screen.getByTestId('row-1')).toBeTruthy();
    expect(screen.getByTestId('row-2')).toBeTruthy();

    // Act: paginate
    await userEvent.click(screen.getByTestId('pager'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('close button calls onClose (AAA)', async () => {
    // Arrange
    const onClose = jest.fn();
    render(
      React.createElement(TaskBoardPresenter, {
        tasks,
        pagination: { ...basePagination },
        isLoading: false,
        error: undefined,
        onPageChange: jest.fn(),
        onClose,
        isAdding: false,
        isUpdating: false,
        stats,
      })
    );

    // Act
    await userEvent.click(screen.getByLabelText(/Close task board/i));

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});


