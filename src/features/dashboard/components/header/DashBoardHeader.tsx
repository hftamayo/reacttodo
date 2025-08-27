import React from 'react';
import { ContainerHeader } from './components/ContainerHeader';
import { ToggleButtonProps } from '@/shared/types/dashboard/menu.type';

export const DashBoardHeader: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <div className="w-full h-16">
      <ContainerHeader setSidebarToggle={setSidebarToggle} appName={appName} />
    </div>
  );
};
