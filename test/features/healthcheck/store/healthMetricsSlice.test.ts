/**
 * @jest-environment jsdom
 */

import React from 'react';
import reducer, {
  setMetrics,
  updateStatus,
  updateNetworkStatus,
  fetchHealthMetrics,
} from '@/features/healthcheck/store/healthMetricsSlice';

// Mock the health service used by the thunk
const mockCheckHealth = jest.fn();
const mockGetMetrics = jest.fn();
jest.mock('@/features/healthcheck/services/HealthService', () => ({
  healthService: {
    checkHealth: () => mockCheckHealth(),
    getMetrics: () => mockGetMetrics(),
  },
}));

describe('healthMetricsSlice (AAA)', () => {
  const baseState = {
    lastCheckTime: 1,
    failureCount: 0,
    averageResponseTime: 0,
    responseTime: 0,
    status: 'CHECKING' as const,
    isOnline: true,
  };

  it('setMetrics replaces the state (AAA)', () => {
    // Arrange
    const replacement = { ...baseState, status: 'ONLINE' as const, responseTime: 123, lastCheckTime: 2 };

    // Act
    const next = reducer(baseState as any, setMetrics(replacement as any));

    // Assert
    expect(next).toEqual(replacement);
  });

  it('updateStatus updates status and lastCheckTime (AAA)', () => {
    // Arrange
    const now = 9999;
    const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(now);

    // Act
    const next = reducer(baseState as any, updateStatus('OFFLINE'));

    // Assert
    expect(next.status).toBe('OFFLINE');
    expect(next.lastCheckTime).toBe(now);

    dateSpy.mockRestore();
  });

  it('updateNetworkStatus toggles isOnline and sets NO_CONNECTION when false (AAA)', () => {
    // Arrange
    const state = { ...baseState, status: 'ONLINE' as const };

    // Act
    const nextOffline = reducer(state as any, updateNetworkStatus(false));
    const nextOnline = reducer(state as any, updateNetworkStatus(true));

    // Assert
    expect(nextOffline.isOnline).toBe(false);
    expect(nextOffline.status).toBe('NO_CONNECTION');
    expect(nextOnline.isOnline).toBe(true);
  });

  it('fetchHealthMetrics.fulfilled replaces state with payload (AAA)', () => {
    // Arrange
    const payload = { ...baseState, status: 'ONLINE' as const, lastCheckTime: 3 };
    const action = { type: fetchHealthMetrics.fulfilled.type, payload } as any;

    // Act
    const next = reducer(baseState as any, action);

    // Assert
    expect(next).toEqual(payload);
  });

  it('fetchHealthMetrics.rejected increments failureCount and sets NO_CONNECTION (AAA)', () => {
    // Arrange
    const now = 123456;
    const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
    const action = { type: fetchHealthMetrics.rejected.type } as any;

    // Act
    const next = reducer(baseState as any, action);

    // Assert
    expect(next.failureCount).toBe(baseState.failureCount + 1);
    expect(next.status).toBe('NO_CONNECTION');
    expect(next.lastCheckTime).toBe(now);

    dateSpy.mockRestore();
  });

  it('fetchHealthMetrics thunk calls healthService and returns metrics (AAA)', async () => {
    // Arrange
    const metrics = { ...baseState, status: 'ONLINE' as const };
    mockGetMetrics.mockReturnValueOnce(metrics);

    const dispatch = jest.fn();
    const getState = jest.fn();

    // Act
    const result = await (fetchHealthMetrics() as any)(dispatch, getState, undefined);

    // Assert
    expect(mockCheckHealth).toHaveBeenCalledTimes(1);
    expect(result.payload).toEqual(metrics);
  });
});


