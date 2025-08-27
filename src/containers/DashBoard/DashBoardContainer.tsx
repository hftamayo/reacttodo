import React from 'react';
import { useHealthCheck } from '@/features/healthcheck/hooks/useHealthCheck';
import { DashBoardAnalyticsPresenter } from './DashBoardAnalyticsPresenter';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';

export const DashBoardContainer: React.FC = () => {
  const metrics = useHealthCheck();
  const loading = metrics.status === 'CHECKING';

  if (loading) {
    return <DashBoardAnalyticsSkeleton />;
  }

  return (
    <div className="p-6">
      <DashBoardAnalyticsPresenter metrics={metrics} />
    </div>
  );
};
