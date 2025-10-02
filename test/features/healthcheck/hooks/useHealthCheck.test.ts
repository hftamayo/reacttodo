/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';

// Arrange: mock the healthService used by the hook
const mockGetMetrics = jest.fn();
const mockUnsubscribe = jest.fn();
let capturedListener: ((m: any) => void) | null = null;
const mockSubscribe = jest.fn((listener: (m: any) => void) => {
  capturedListener = listener;
  // Immediately call with current metrics as implementation does
  if (mockGetMetrics.mock.results.length > 0) {
    listener(mockGetMetrics.mock.results[mockGetMetrics.mock.results.length - 1].value);
  }
  return mockUnsubscribe;
});

jest.mock('@/features/healthcheck/services/HealthService', () => ({
  healthService: {
    getMetrics: () => mockGetMetrics(),
    subscribe: (listener: (m: any) => void) => mockSubscribe(listener),
  },
}));

import { useHealthCheck } from '@/features/healthcheck/hooks/useHealthCheck';

const HookConsumer: React.FC = () => {
  const metrics = useHealthCheck();
  return React.createElement('pre', {}, JSON.stringify(metrics));
};

describe('useHealthCheck (AAA)', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    capturedListener = null;
  });

  it('returns initial metrics from healthService.getMetrics (AAA)', () => {
    // Arrange
    const initial = {
      lastCheckTime: 1,
      failureCount: 0,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'CHECKING',
      isOnline: true,
    };
    mockGetMetrics.mockReturnValueOnce(initial);

    // Act
    render(React.createElement(HookConsumer));

    // Assert
    const payload = JSON.parse(screen.getByText(/\{/).textContent || '{}');
    expect(payload).toEqual(initial);
    expect(mockSubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates metrics when healthService emits via subscribe (AAA)', () => {
    // Arrange
    const initial = {
      lastCheckTime: 1,
      failureCount: 0,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'CHECKING',
      isOnline: true,
    };
    const updated = { ...initial, status: 'ONLINE', responseTime: 123, lastCheckTime: 2 };
    mockGetMetrics.mockReturnValueOnce(initial);

    // Act
    render(React.createElement(HookConsumer));
    act(() => {
      capturedListener && capturedListener(updated);
    });

    // Assert
    const payload = JSON.parse(screen.getByText(/\{/).textContent || '{}');
    expect(payload.status).toBe('ONLINE');
    expect(payload.responseTime).toBe(123);
  });

  it('unsubscribes on unmount (AAA)', () => {
    // Arrange
    const initial = {
      lastCheckTime: 1,
      failureCount: 0,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'CHECKING',
      isOnline: true,
    };
    mockGetMetrics.mockReturnValueOnce(initial);

    // Act
    const { unmount } = render(React.createElement(HookConsumer));
    unmount();

    // Assert
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});


