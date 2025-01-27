import React from 'react';
import { ContainerHeader } from './actions/ContainerHeader';
import { ToggleButtonProps } from '@/shared/types/menu.type';

const DashBoardHeader: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <div className="w-full">
      <ContainerHeader setSidebarToggle={setSidebarToggle} appName={appName} />
    </div>
  );
};

export default DashBoardHeader;
