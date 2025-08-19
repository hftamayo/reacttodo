import React from 'react';

/**
 * DashBoardContainer - Main authenticated application container
 * This component contains the main dashboard content for authenticated users
 * Layout is now handled at the routing level via MainLayout wrapper
 */
export const DashBoardContainer: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard!</p>
    </div>
  );
};
