import React from 'react';
import SkeletonDashBoardAnalytics from '@/shared/components/ui/dashboard/skeleton/SkeletonDashBoardAnalytics';

const SkeletonCustomOutlet: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SkeletonDashBoardAnalytics />
    </div>
  );
};

export default SkeletonCustomOutlet;
