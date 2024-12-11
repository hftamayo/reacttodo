import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import { APP_NAME } from '@/shared/utils/envvars';
import SearchText from './SearchText';
import { FaBell } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';

const ContainerActions: React.FC = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const appName = APP_NAME;

  return (
    <nav className="flex items-center justify-between p-2 bg-gray-800">
      <ToggleButton
        setSidebarToggle={() => setSidebarToggle(!sidebarToggle)}
        appName={appName}
      />
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
