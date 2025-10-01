/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskBoardActions } from '../../../../../src/features/task/hooks/composition/useTaskBoardActions';

// Mock mutations hook
const mockAdd = { mutateAsync: jest.fn(), isPending: false };
const mockUpdate = { mutateAsync: jest.fn(), isPending: true };
const mockDelete = { mutateAsync: jest.fn(), isPending: false };
const mockToggle = { mutateAsync: jest.fn(), isPending: false };

jest.mock('../../../../../src/features/task/hooks/core/useTaskBoardMutations', () => ({
  useTaskBoardMutations: () => ({
    addTask: mockAdd,
    updateTask: mockUpdate,
    deleteTask: mockDelete,
    toggleTaskDone: mockToggle,
  }),
}));

describe('useTaskBoardActions (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAdd.isPending = false;
    mockUpdate.isPending = true;
    mockDelete.isPending = false;
    mockToggle.isPending = false;
  });

  const task = { id: 7, title: 'T', description: 'D', done: false, owner: 'u' } as any;

  const Host: React.FC<{ onReady: (h: any) => void }> = ({ onReady }) => {
    const h = useTaskBoardActions(task);
    React.useEffect(() => { onReady(h); }, [h, onReady]);
    return null;
  };

  it('exposes pending flags mapped from mutations (AAA)', async () => {
    // Arrange
    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Assert
    expect(hook.isAdding).toBe(false);
    expect(hook.isUpdating).toBe(true);
    expect(hook.isDeleting).toBe(false);
    expect(hook.isToggling).toBe(false);
  });

  it('onAddTask calls addTask.mutateAsync with new task (AAA)', async () => {
    // Arrange
    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });
    const newTask = { title: 'N', description: 'X' } as any;

    // Act
    await act(async () => {
      await hook.onAddTask(newTask);
    });

    // Assert
    expect(mockAdd.mutateAsync).toHaveBeenCalledWith(newTask);
  });

  it('onToggle calls toggleTaskDone.mutateAsync with task id (AAA)', async () => {
    // Arrange
    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Act
    await act(async () => {
      await hook.onToggle();
    });

    // Assert
    expect(mockToggle.mutateAsync).toHaveBeenCalledWith(task.id);
  });

  it('onDelete calls deleteTask.mutateAsync with task id (AAA)', async () => {
    // Arrange
    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Act
    await act(async () => {
      await hook.onDelete();
    });

    // Assert
    expect(mockDelete.mutateAsync).toHaveBeenCalledWith(task.id);
  });

  it('onUpdate calls updateTask.mutateAsync with full task (AAA)', async () => {
    // Arrange
    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Act
    await act(async () => {
      await hook.onUpdate();
    });

    // Assert
    expect(mockUpdate.mutateAsync).toHaveBeenCalledWith(task);
  });
});





