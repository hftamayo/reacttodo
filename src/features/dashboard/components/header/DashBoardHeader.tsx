import React from 'react';
import ContainerActions from './actions/ContainerActions';
import { ToggleButtonProps } from '@/shared/types/menu.type';

const DashBoardHeader: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <div className="w-full">
      <ContainerActions setSidebarToggle={setSidebarToggle} appName={appName} />
    </div>
  );
};

export default DashBoardHeader;
