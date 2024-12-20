import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/shared/services/redux/storeHooks';
import CustomOutlet from '@/shared/services/routing/CustomOutlet';
import SkeletonCustomOutlet from '@/shared/services/routing/SkeletonCustomOutlet';
import DashBoardHeader from '@/features/dashboard/components/header/DashBoardHeader';
import DashBoardToggleMenuBar from '@/features/dashboard/components/menu/DashBoardToggleMenuBar';
import DashBoardFooter from '@/features/dashboard/components/footer/DashBoardFooter';
import {
  adminMenuOptions,
  supervisorMenuOptions,
  userMenuOptions,
} from '@/features/dashboard/components/menu/services/menuOptions';
import { APP_NAME } from '@/shared/utils/envvars';
import { MainLayoutStyles } from '@/shared/utils/twind/styles';

const MainLayout: React.FC = () => {
  const theme = useAppSelector((state: any) => state.theme.theme);
  const isAuthenticated = true;
  const userRole = 'admin';

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  let menuOptions;
  if (userRole === 'admin') {
    menuOptions = adminMenuOptions;
  } else if (userRole === 'supervisor') {
    menuOptions = supervisorMenuOptions;
  } else {
    menuOptions = userMenuOptions;
  }

  return (
    <div className={MainLayoutStyles.layoutContainer}>
      <div className={MainLayoutStyles.layoutHeader}>
        {isAuthenticated ? (
          <DashBoardHeader
            setSidebarToggle={() => setSidebarToggle(!sidebarToggle)}
            appName={APP_NAME}
          />
        ) : null}
      </div>
      <div className="flex flex-grow">
        <div
          className={`${MainLayoutStyles.layoutSideBar} ${sidebarToggle ? 'block' : 'hidden'}`}
        >
          <DashBoardToggleMenuBar
            options={menuOptions}
            isCollapsed={sidebarToggle}
          />
        </div>
        <div className={MainLayoutStyles.layoutContent(sidebarToggle)}>
          <SkeletonCustomOutlet />
        </div>
      </div>
      <div className={MainLayoutStyles.layoutFooter}>
        {isAuthenticated ? <DashBoardFooter /> : null}
      </div>
    </div>
  );
};

export default MainLayout;
