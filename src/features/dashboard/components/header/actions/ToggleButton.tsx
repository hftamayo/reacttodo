import React from 'react';
import { FaBars } from 'react-icons/fa';
import { ToggleButtonProps } from '@/shared/types/menu.type';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';

const ToggleButton: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <div className="flex items-center text-xl">
      <FaBars
        className={DashBoardHeaderActionsStyles.toggleButton}
        onClick={setSidebarToggle}
      />
      <span className="text-white font-semibold">${appName}</span>
    </div>
  );
};
