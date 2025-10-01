/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskRow } from '@/features/task/components/row/TaskRow';

jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => {
    if (key === 'deleteRowButton') return { text: 'Delete' } as any;
    if (key === 'updateRowButton') return { text: 'Edit' } as any;
    return { text: '' } as any;
  },
}));

jest.mock('@/shared/components/dialogs/DeleteDialog', () => ({
  DeleteDialog: ({ isOpen, onConfirm, onCancel }: any) => {
    return isOpen
      ? React.createElement(
          'div',
          { 'data-testid': 'delete-dialog' },
          React.createElement('button', { onClick: onConfirm }, 'Confirm'),
          React.createElement('button', { onClick: onCancel }, 'Cancel')
        )
      : null;
  },
}));

describe('TaskRow (AAA)', () => {
  const baseTask = {
    id: 1,
    title: 'Task A',
    description: 'Desc',
    done: false,
    owner: 1,
  };

  it('renders unchecked row and triggers toggle on checkbox/label click (AAA)', async () => {
    // Arrange
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onConfirmDelete = jest.fn();
    const onCancelDelete = jest.fn();

    render(
      React.createElement(TaskRow as any, {
        ...baseTask,
        onToggle,
        onDelete,
        onEdit,
        isToggling: false,
        isDeleting: false,
        isDialogOpen: false,
        onConfirmDelete,
        onCancelDelete,
      })
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Mark "Task A" as complete/i,
    });
    const label = screen.getByText('Task A');

    // Act
    await userEvent.click(checkbox);
    await userEvent.click(label);

    // Assert
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onDelete).not.toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
  });

  it('disables controls when toggling/deleting and blocks actions (AAA)', async () => {
    // Arrange
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      React.createElement(TaskRow as any, {
        ...baseTask,
        onToggle,
        onDelete,
        onEdit,
        isToggling: true,
        isDeleting: false,
        isDialogOpen: false,
        onConfirmDelete: jest.fn(),
        onCancelDelete: jest.fn(),
      })
    );

    const checkbox = screen.getByRole('checkbox');
    const deleteBtn = screen.getByRole('button', { name: /Delete task "Task A"/i });

    // Act
    await userEvent.click(checkbox);
    await userEvent.click(deleteBtn);

    // Assert
    expect((checkbox as HTMLInputElement).disabled).toBe(true);
    expect((deleteBtn as HTMLButtonElement).disabled).toBe(true);
    expect(onToggle).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('opens DeleteDialog when delete clicked and wires confirm/cancel (AAA)', async () => {
    // Arrange
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onConfirmDelete = jest.fn();
    const onCancelDelete = jest.fn();

    const { rerender } = render(
      React.createElement(TaskRow as any, {
        ...baseTask,
        onToggle,
        onDelete,
        onEdit,
        isToggling: false,
        isDeleting: false,
        isDialogOpen: false,
        onConfirmDelete,
        onCancelDelete,
      })
    );

    const deleteBtn = screen.getByRole('button', { name: /Delete task "Task A"/i });
    await userEvent.click(deleteBtn);

    // parent container controls isDialogOpen; simulate open state
    rerender(
      React.createElement(TaskRow as any, {
        ...baseTask,
        onToggle,
        onDelete,
        onEdit,
        isToggling: false,
        isDeleting: false,
        isDialogOpen: true,
        onConfirmDelete,
        onCancelDelete,
      })
    );

    // Act
    const dialog = await screen.findByTestId('delete-dialog');
    const confirm = screen.getByText('Confirm');
    const cancel = screen.getByText('Cancel');
    await userEvent.click(confirm);
    await userEvent.click(cancel);

    // Assert
    expect(onConfirmDelete).toHaveBeenCalledTimes(1);
    expect(onCancelDelete).toHaveBeenCalledTimes(1);
  });

  it('disables edit button when task is done (AAA)', () => {
    // Arrange
    render(
      React.createElement(TaskRow as any, {
        ...baseTask,
        done: true,
        onToggle: jest.fn(),
        onDelete: jest.fn(),
        onEdit: jest.fn(),
        isToggling: false,
        isDeleting: false,
        isDialogOpen: false,
        onConfirmDelete: jest.fn(),
        onCancelDelete: jest.fn(),
      })
    );

    // Assert
    const editBtn = screen.getByRole('button', { name: /Edit task "Task A"/i });
    expect((editBtn as HTMLButtonElement).disabled).toBe(true);
  });
});


