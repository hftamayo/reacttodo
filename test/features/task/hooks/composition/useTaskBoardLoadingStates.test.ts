/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskBoardLoadingStates } from '../../../../../src/features/task/hooks/composition/useTaskBoardLoadingStates';

const makePending = (p: boolean) => ({ mutateAsync: jest.fn(), isPending: p });

// Default mock values (will be overridden per test)
let addPending = false;
let updatePending = false;
let deletePending = false;
let togglePending = false;

jest.mock('../../../../../src/features/task/hooks/core/useTaskBoardMutations', () => ({
  useTaskBoardMutations: () => ({
    addTask: makePending(addPending),
    updateTask: makePending(updatePending),
    deleteTask: makePending(deletePending),
    toggleTaskDone: makePending(togglePending),
  }),
}));

describe('useTaskBoardLoadingStates (AAA)', () => {
  beforeEach(() => {
    addPending = false;
    updatePending = false;
    deletePending = false;
    togglePending = false;
  });

  const Host: React.FC<{ onReady: (h: any) => void }> = ({ onReady }) => {
    const h = useTaskBoardLoadingStates();
    React.useEffect(() => { onReady(h); }, [h, onReady]);
    return null;
  };

  it('maps all pending flags from mutations (AAA)', async () => {
    // Arrange
    addPending = true;
    updatePending = true;
    deletePending = false;
    togglePending = true;

    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Assert
    expect(hook.isAdding).toBe(true);
    expect(hook.isUpdating).toBe(true);
    expect(hook.isDeleting).toBe(false);
    expect(hook.isToggling).toBe(true);
  });

  it('returns all false when no mutation is pending (AAA)', async () => {
    // Arrange
    addPending = false;
    updatePending = false;
    deletePending = false;
    togglePending = false;

    let hook: any;
    await act(async () => {
      render(React.createElement(Host, { onReady: (h: any) => { hook = h; } }));
    });

    // Assert
    expect(hook.isAdding).toBe(false);
    expect(hook.isUpdating).toBe(false);
    expect(hook.isDeleting).toBe(false);
    expect(hook.isToggling).toBe(false);
  });
});






