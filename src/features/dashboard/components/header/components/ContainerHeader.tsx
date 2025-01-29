import React from 'react';
import { ToggleButton } from './ToggleButton';
import { SearchText } from './SearchText';
import { ProfileMenu } from './ProfileMenu';
import { ThemeButton } from './ThemeButton';
import { FaBell } from 'react-icons/fa';
import { ToggleButtonProps } from '@/shared/types/menu.type';

export const ContainerHeader: React.FC<ToggleButtonProps> = ({
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
        <ThemeButton />
        <ProfileMenu />
      </div>
    </nav>
  );
};
