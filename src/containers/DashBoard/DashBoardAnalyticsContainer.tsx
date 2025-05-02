import React from 'react';
import { useHealthCheck } from '@/features/healthcheck/hooks/useHealthCheck';
import { DashBoardAnalyticsPresenter } from './DashBoardAnalyticsPresenter';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';

export const DashBoardAnalyticsContainer: React.FC = () => {
  const metrics = useHealthCheck();
  const loading = metrics.status === 'CHECKING';

  if (loading) {
    return <DashBoardAnalyticsSkeleton />;
  }

  return <DashBoardAnalyticsPresenter metrics={metrics} />;
};
