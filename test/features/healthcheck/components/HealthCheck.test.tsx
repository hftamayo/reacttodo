/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';

import { HealthCheck } from '@/features/healthcheck/components/HealthCheck';

// Mock translations (even if unused in returned JSX) to avoid dependency issues
jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => ({ text: key }),
}));

// Mock useHealthCheck to control metrics
jest.mock('@/features/healthcheck/hooks/useHealthCheck', () => ({
  useHealthCheck: jest.fn(),
}));

const { useHealthCheck } = require('@/features/healthcheck/hooks/useHealthCheck');

describe('HealthCheck (AAA)', () => {
  it('subscribes to metrics and runs effect on status change (AAA)', () => {
    // Arrange
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    useHealthCheck.mockReturnValueOnce({
      lastCheckTime: 1,
      failureCount: 0,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'CHECKING',
      isOnline: true,
    });

    // Act
    render(React.createElement(HealthCheck));

    // Assert
    expect(spy).toHaveBeenCalledWith('Health Status Updated:', 'CHECKING');

    spy.mockRestore();
  });
});


