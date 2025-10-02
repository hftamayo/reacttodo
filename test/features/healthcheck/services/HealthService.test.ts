/**
 * @jest-environment jsdom
 */

import React from 'react';

describe('HealthService (AAA)', () => {
  const originalFetch = global.fetch as any;
  let getOnlineSpy: jest.SpyInstance<boolean, []>;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();

    // Mock env vars to small intervals to avoid long waits
    jest.doMock('@/shared/utils/envvars', () => ({
      HEALTH_CHECK_INTERVAL: 1000,
      OFFLINE_CHECK_INTERVAL: 500,
      MAX_RETRIES: 3,
      BACKEND_URL: 'http://localhost:3000',
    }));

    // Mock notifications
    jest.doMock('@/shared/services/notification/notificationService', () => ({
      showSuccess: jest.fn(),
      showError: jest.fn(),
    }));

    // Default online
    getOnlineSpy = jest.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(true);

    // Mock fetch
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    if (getOnlineSpy) getOnlineSpy.mockRestore();
    (global as any).fetch = originalFetch;
  });

  it('sets ONLINE metrics on successful health check (AAA)', async () => {
    // Arrange
    const okResponse = { ok: true } as Response;
    (global.fetch as jest.Mock).mockResolvedValue(okResponse);

    let healthService: any;
    jest.isolateModules(() => {
      // Import inside isolated context to create a fresh singleton
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@/features/healthcheck/services/HealthService');
      healthService = mod.healthService;
    });
    // Stop background intervals/listeners from constructor
    healthService.cleanup();

    // Act
    await healthService.checkHealth();

    // Assert
    const metrics = healthService.getMetrics();
    expect(metrics.status).toBe('ONLINE');
    expect(metrics.isOnline).toBe(true);
    expect(metrics.failureCount).toBe(0);
    expect(metrics.responseTime).toBeGreaterThanOrEqual(0);

    // Cleanup
    healthService.cleanup();
  });

  it('sets OFFLINE metrics and schedules retry on non-ok response (AAA)', async () => {
    // Arrange
    const notOkResponse = { ok: false } as Response;
    (global.fetch as jest.Mock).mockResolvedValue(notOkResponse);

    const { showError } = require('@/shared/services/notification/notificationService');

    let healthService: any;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@/features/healthcheck/services/HealthService');
      healthService = mod.healthService;
    });
    // Stop background intervals/listeners from constructor
    healthService.cleanup();

    // Act
    await healthService.checkHealth();

    // Assert
    const metrics = healthService.getMetrics();
    expect(metrics.status).toBe('OFFLINE');
    expect(metrics.isOnline).toBe(false);
    // Constructor may trigger an initial check; ensure at least one failure was recorded
    expect(metrics.failureCount).toBeGreaterThanOrEqual(1);
    expect(showError).toHaveBeenCalledWith('BackEnd Error', 'Backend service unavailable');

    // Verify a retry is scheduled
    expect(jest.getTimerCount()).toBeGreaterThan(0);

    // Cleanup
    healthService.cleanup();
  });

  it('handles timeout as AbortError and updates metrics (AAA)', async () => {
    // Arrange
    const abortErr = new Error('aborted');
    (abortErr as any).name = 'AbortError';
    (global.fetch as jest.Mock).mockRejectedValueOnce(abortErr);

    const { showError } = require('@/shared/services/notification/notificationService');

    let healthService: any;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@/features/healthcheck/services/HealthService');
      healthService = mod.healthService;
    });
    healthService.cleanup();

    // Act
    await healthService.checkHealth();

    // Assert
    const metrics = healthService.getMetrics();
    expect(metrics.status).toBe('OFFLINE');
    expect(metrics.isOnline).toBe(false);
    expect(metrics.failureCount).toBeGreaterThanOrEqual(1);
    expect(showError).toHaveBeenCalledWith('BackEnd Error', 'Backend request timeout');

    // Cleanup
    healthService.cleanup();
  });

  it('sets NO_CONNECTION when offline and does not fetch (AAA)', async () => {
    // Arrange
    getOnlineSpy.mockReturnValue(false);
    (global.fetch as jest.Mock).mockClear();

    let healthService: any;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@/features/healthcheck/services/HealthService');
      healthService = mod.healthService;
    });
    healthService.cleanup();

    // Act
    await healthService.checkHealth();

    // Assert
    const metrics = healthService.getMetrics();
    expect(metrics.status).toBe('NO_CONNECTION');
    expect(metrics.isOnline).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();

    // Cleanup
    healthService.cleanup();
  });

  it('subscribe returns initial metrics and updates on change (AAA)', async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true } as Response);

    let healthService: any;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@/features/healthcheck/services/HealthService');
      healthService = mod.healthService;
    });
    healthService.cleanup();

    const received: any[] = [];

    // Act
    const unsubscribe = healthService.subscribe((m: any) => received.push(m));
    await healthService.checkHealth();

    // Assert
    expect(received.length).toBeGreaterThanOrEqual(2); // initial + after update
    expect(received[0]).toHaveProperty('status');
    expect(received[received.length - 1].status).toBe('ONLINE');

    // Cleanup
    unsubscribe();
    healthService.cleanup();
  });
});


