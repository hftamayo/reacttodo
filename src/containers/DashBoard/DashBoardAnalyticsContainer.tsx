import React from 'react';
import { useHealthMetrics } from '@/shared/services/redux/hooks/useHealthMetrics';
import { DashBoardAnalyticsPresenter } from './DashBoardAnalyticsPresenter';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';

export const DashBoardAnalyticsContainer: React.FC = () => {
  const { metrics, loading } = useHealthMetrics();

  if (loading) {
    return <DashBoardAnalyticsSkeleton />;
  }

  return <DashBoardAnalyticsPresenter metrics={metrics} />;
};
