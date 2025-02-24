import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/services/redux/rootReducer';
import { DashBoardAnalyticsPresenter } from './DashBoardAnalyticsPresenter';
export const DashBoardAnalyticsContainer: React.FC = () => {
  const metrics = useSelector((state: RootState) => state.healthMetrics);

  return <DashBoardAnalyticsPresenter metrics={metrics} />;
};
