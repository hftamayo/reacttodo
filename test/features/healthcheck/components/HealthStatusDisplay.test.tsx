/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HealthStatusDisplay } from '@/features/healthcheck/components/HealthStatusDisplay';

// Mock translations to stable defaults
jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => ({ text: key }),
}));

// Mock env vars
jest.mock('@/shared/utils/envvars', () => ({
  MAX_RETRIES: 5,
}));

// Mock styles to avoid twind specifics
jest.mock('@/shared/utils/twind/styles', () => ({
  DashBoardFooterStyles: {
    footer_text: 'online-class',
    footer_text_offline: 'offline-class',
    footer_text_no_connection: 'noconn-class',
    footer_text_checking: 'checking-class',
  },
}));

// Mock hook to control metrics
jest.mock('@/features/healthcheck/hooks/useHealthCheck', () => ({
  useHealthCheck: jest.fn(),
}));

const { useHealthCheck } = require('@/features/healthcheck/hooks/useHealthCheck');

describe('HealthStatusDisplay (AAA)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ONLINE status with proper class and title (AAA)', () => {
    // Arrange
    const lastCheck = 1700000000000; // fixed timestamp
    useHealthCheck.mockReturnValueOnce({
      lastCheckTime: lastCheck,
      failureCount: 0,
      averageResponseTime: 0,
      responseTime: 10,
      status: 'ONLINE',
      isOnline: true,
    });

    // Act
    render(React.createElement(HealthStatusDisplay));

    // Assert
    const output = screen.getByRole('status', { hidden: true }) || screen.getByText(/Backend: Online/);
    expect(output).toHaveClass('online-class');
    expect(output).toHaveAttribute('title', expect.stringContaining('Last checked:'));
    expect(output.textContent).toMatch(/Backend: Online/);
  });

  it('renders OFFLINE with retry count and class (AAA)', () => {
    // Arrange
    useHealthCheck.mockReturnValueOnce({
      lastCheckTime: Date.now(),
      failureCount: 2,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'OFFLINE',
      isOnline: false,
    });

    // Act
    render(React.createElement(HealthStatusDisplay));

    // Assert
    const el = screen.getByText(/Backend: Offline/);
    expect(el).toHaveClass('offline-class');
    expect(el.textContent).toMatch(/Retry 2\/5/);
  });

  it('renders NO_CONNECTION with class (AAA)', () => {
    // Arrange
    useHealthCheck.mockReturnValueOnce({
      lastCheckTime: Date.now(),
      failureCount: 1,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'NO_CONNECTION',
      isOnline: false,
    });

    // Act
    render(React.createElement(HealthStatusDisplay));

    // Assert
    const el = screen.getByText(/Backend: No Connection/);
    expect(el).toHaveClass('noconn-class');
  });

  it('renders CHECKING with dynamic dots and class (AAA)', () => {
    // Arrange
    useHealthCheck.mockReturnValueOnce({
      lastCheckTime: Date.now(),
      failureCount: 1,
      averageResponseTime: 0,
      responseTime: 0,
      status: 'CHECKING',
      isOnline: true,
    });

    // Act
    render(React.createElement(HealthStatusDisplay));

    // Assert
    const el = screen.getByText(/Backend: Checking/);
    expect(el).toHaveClass('checking-class');
    expect(el.textContent).toMatch(/Backend: Checking\.+/);
  });
});


