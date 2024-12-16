import React, { useState } from 'react';
import CustomOutlet from '@/shared/services/routing/CustomOutlet';
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

const MainLayout = () => {
  const isAuthenticated = true;
  const userRole = 'admin';

  const [sidebarToggle, setSidebarToggle] = useState(true);

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
      <div className="flex">
        <DashBoardToggleMenuBar
          options={menuOptions}
          isCollapsed={sidebarToggle}
          onCollapse={() => setSidebarToggle(!sidebarToggle)}
        />
        <div
          className={`${MainLayoutStyles.layoutContent} flex items-center justify-center overflow-hidden`}
        >
          <CustomOutlet />
        </div>
      </div>
      <div className={MainLayoutStyles.layoutFooter}>
        {isAuthenticated ? <DashBoardFooter /> : null}
      </div>
    </div>
  );
};

export default MainLayout;
