import React from 'react';
import { Link } from 'wouter';
import { FaBars } from 'react-icons/fa';
import { ToggleButtonProps } from '@/shared/types/menu.type';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';

const ToggleButton: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <div className="flex items-center text-xl mr-4">
      <FaBars
        className={DashBoardHeaderActionsStyles.toggleButton}
        onClick={setSidebarToggle}
      />
      <Link href="/" className="text-white font-semibold ml-2">
        {appName}
      </Link>
    </div>
  );
};

export default ToggleButton;
