import React from 'react';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const DashBoardAnalyticsPresenter: React.FC<{
  metrics: HealthMetrics;
}> = ({ metrics }) => {
  const { title } = useTranslation('dashboardAnalyticsForm');

  const statusText = {
    ONLINE: 'System Operational',
    OFFLINE: 'System Unavailable',
    NO_CONNECTION: 'No Connection',
    CHECKING: 'Checking Status...',
  }[metrics.status];

  return (
    <div className="bg-[var(--cameo-100)] p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Health Metrics</h3>
        <div className="flex flex-col items-start">
          <span>Status: {statusText}</span>
          <span>
            Last Check: {new Date(metrics.lastCheckTime).toLocaleString()}
          </span>
          <span>Failures: {metrics.failureCount}</span>
          <span>
            Avg Response Time: {metrics.averageResponseTime.toFixed(2)} ms
          </span>
          <span>Last Response Time: {metrics.responseTime.toFixed(2)} ms</span>
          <span>
            Network Connection: {metrics.isOnline ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};
