import React from 'react';
import { MainLayout } from '../../shared/components/ui/layout/dashboard/MainLayout';

/**
 * DashBoardContainer - Main authenticated application container
 * This component contains the main dashboard layout for authenticated users
 */
export const DashBoardContainer: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
    </MainLayout>
  );
};
