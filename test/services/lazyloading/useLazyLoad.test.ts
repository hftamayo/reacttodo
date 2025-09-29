/**
 * @jest-environment jsdom
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useLazyLoad } from '../../../src/shared/services/lazyloading/hooks/useLazyLoad';

// Mock IntersectionObserver
const observe = jest.fn();
const unobserve = jest.fn();
let callbackRef: IntersectionObserverCallback | null = null;

beforeAll(() => {
  (global as any).IntersectionObserver = jest.fn((cb: IntersectionObserverCallback) => {
    callbackRef = cb;
    return {
      observe,
      unobserve,
      disconnect: jest.fn(),
      root: null,
      rootMargin: '0px',
      thresholds: [],
      takeRecords: () => [],
    } as unknown as IntersectionObserver;
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  callbackRef = null;
});

afterAll(() => {
  (global as any).IntersectionObserver = undefined;
});

// Test component to consume the hook without JSX/testing-library
const TestComponent: React.FC<{ onUpdate: (v: boolean) => void }> = ({ onUpdate }) => {
  const { ref, shouldFetch } = useLazyLoad();

  useEffect(() => {
    onUpdate(shouldFetch);
  }, [shouldFetch, onUpdate]);

  return React.createElement('div', { ref });
};

describe('useLazyLoad (AAA)', () => {
  it('initializes with shouldFetch=true and registers observer (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    const updates: boolean[] = [];

    // Act
    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onUpdate: (v: boolean) => { updates.push(v); } }),
        container
      );
    });

    // Assert
    expect(updates[0]).toBe(true);
    expect(observe).toHaveBeenCalledTimes(1);
    const observedEl = (observe.mock.calls[0][0]) as Element;
    expect(observedEl instanceof HTMLElement).toBe(true);

    // Cleanup
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });

  it('sets shouldFetch=true when element intersects (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    const updates: boolean[] = [];

    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onUpdate: (v: boolean) => { updates.push(v); } }),
        container
      );
    });

    // Act
    act(() => {
      // trigger intersection callback
      callbackRef && callbackRef([
        { isIntersecting: true } as IntersectionObserverEntry,
      ], {} as IntersectionObserver);
    });

    // Assert
    expect(updates.length).toBeGreaterThan(0);
    expect(updates[updates.length - 1]).toBe(true);

    // Cleanup
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });

  it('unregisters observer on unmount (AAA)', () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(
        React.createElement(TestComponent, { onUpdate: () => {} }),
        container
      );
    });

    // Act
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });

    // Assert
    expect(unobserve).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(container);
  });
});


