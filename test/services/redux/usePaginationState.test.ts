/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { usePaginationState } from '../../../src/shared/services/redux/hooks/usePaginationState';

jest.mock('../../../src/shared/utils/envvars', () => ({
  PAGINATION_LIMIT: 20,
}));

type HookState = {
  page: number;
  limit: number;
  setPage: (n: number) => void;
  setLimit: (n: number) => void;
};

const TestComponent: React.FC<{ onState: (s: HookState) => void; initial?: { page?: number; limit?: number } }>
  = ({ onState, initial }) => {
    const hook = usePaginationState(initial as any);
    React.useEffect(() => { onState(hook as any); }, [hook, onState]);
    return React.createElement('div');
  };

describe('usePaginationState (AAA)', () => {
  it('initializes with defaults when no params provided (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    // Act
    act(() => {
      ReactDOM.render(React.createElement(TestComponent, { onState: (s) => { state = s; } }), container);
    });

    // Assert
    expect(state).not.toBeNull();
    expect(state!.page).toBe(1);
    expect(state!.limit).toBe(20);
    expect(typeof state!.setPage).toBe('function');
    expect(typeof state!.setLimit).toBe('function');

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });

  it('initializes with provided initial params (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    // Act
    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onState: (s) => { state = s; }, initial: { page: 3, limit: 50 } }),
        container
      );
    });

    // Assert
    expect(state!.page).toBe(3);
    expect(state!.limit).toBe(50);

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });

  it('setPage updates page when valid (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    act(() => {
      ReactDOM.render(React.createElement(TestComponent, { onState: (s) => { state = s; } }), container);
    });

    // Act
    act(() => {
      state!.setPage(5);
    });

    // Assert
    expect(state!.page).toBe(5);
    expect(state!.limit).toBe(20);

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });

  it('setPage ignores invalid values (<1) (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onState: (s) => { state = s; }, initial: { page: 2 } }),
        container
      );
    });

    // Act
    act(() => {
      state!.setPage(0);
    });

    // Assert
    expect(state!.page).toBe(2);

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });

  it('setLimit updates limit and resets page to 1 when valid (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onState: (s) => { state = s; }, initial: { page: 4, limit: 10 } }),
        container
      );
    });

    // Act
    act(() => {
      state!.setLimit(100);
    });

    // Assert
    expect(state!.limit).toBe(100);
    expect(state!.page).toBe(1);

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });

  it('setLimit ignores invalid values (<1) (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    let state: HookState | null = null;

    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onState: (s) => { state = s; }, initial: { page: 3, limit: 15 } }),
        container
      );
    });

    // Act
    act(() => {
      state!.setLimit(0);
    });

    // Assert
    expect(state!.limit).toBe(15);
    expect(state!.page).toBe(3);

    // Cleanup
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    document.body.removeChild(container);
  });
});


