import React from 'react';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

const SkeletonDashBoardAnalytics: React.FC = () => {
  const { title } = useTranslation('dashboardAnalyticsForm');

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
        <div className="w-64 h-32 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonDashBoardAnalytics;
