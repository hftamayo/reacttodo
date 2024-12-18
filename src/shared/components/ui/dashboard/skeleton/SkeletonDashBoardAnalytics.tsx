import React from 'react';

const SkeletonDashBoardAnalytics: React.FC = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">DashBoard Analytics</h2>
      <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-32 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default SkeletonDashBoardAnalytics;
