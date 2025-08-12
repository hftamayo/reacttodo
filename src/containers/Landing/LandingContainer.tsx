import React from 'react';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';
import LandingPresenter from './LandingPresenter';

export const LandingContainer: React.FC = () => {
  const loading = true;
  if (loading) {
    return <DashBoardAnalyticsSkeleton />;
  }
  return <LandingPresenter />;
};
