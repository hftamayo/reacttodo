import React from 'react';
import ToggleButton from './ToggleButton';
import SearchText from './SearchText';
import { FaBell } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import { ToggleButtonProps } from '@/shared/types/menu.type';

const ContainerActions: React.FC<ToggleButtonProps> = ({
  setSidebarToggle,
  appName,
}) => {
  return (
    <nav className="flex items-center justify-between p-2 bg-gray-800">
      <ToggleButton setSidebarToggle={setSidebarToggle} appName={appName} />
      <div className="flex items-center gap-x-5">
        <SearchText />
        <div className="text-white">
          <FaBell className="w-6 h-6" />
        </div>
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default ContainerActions;
