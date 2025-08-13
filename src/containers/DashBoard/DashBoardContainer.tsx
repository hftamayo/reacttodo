import React from 'react';
import { MainLayout } from '../../shared/components/ui/layout/dashboard/MainLayout';

/**
 * DashBoardContainer - Main authenticated application container
 * This component contains the main dashboard layout for authenticated users
 */
export const DashBoardContainer: React.FC = () => {
  return (
    <div>
      <MainLayout />
    </div>
  );
};
