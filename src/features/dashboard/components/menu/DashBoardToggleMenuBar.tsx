import React from 'react';
import { ContainerMenuBar } from './components/ContainerMenuBar';
import { MenuBarProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const DashBoardToggleMenuBar: React.FC<MenuBarProps> = ({
  userRole,
  managementOptions,
  isCollapsed,
}) => {
  return (
    <div
      className={`${DashBoardMenuBarStyles.base} 
      ${isCollapsed ? DashBoardMenuBarStyles.collapsed : DashBoardMenuBarStyles.expanded}`}
    >
      <ContainerMenuBar
        userRole={userRole}
        managementOptions={managementOptions}
      />
    </div>
  );
};
