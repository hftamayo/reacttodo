import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { CustomOutlet } from '@/shared/services/routing/CustomOutlet';
import { SkeletonCustomOutlet } from '@/shared/services/routing/SkeletonCustomOutlet';
import { DashBoardHeader } from '@/features/dashboard/components/header/DashBoardHeader';
import { DashBoardToggleMenuBar } from '@/features/dashboard/components/menu/DashBoardToggleMenuBar';
import { DashBoardFooter } from '@/features/dashboard/components/footer/DashBoardFooter';
import { menuOptions } from '@/features/dashboard/components/menu/services/menuOptions';
import { APP_NAME } from '@/shared/utils/envvars';
import { MainLayoutStyles } from '@/shared/utils/twind/styles';

export const MainLayout: React.FC = () => {
  const theme = useAppSelector((state: any) => state.theme.theme);
  const isAuthenticated = true;
  const userRole = 'admin';
  const { adminMenuOptions, supervisorMenuOptions, userMenuOptions } =
    menuOptions();

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  let selectMenuOptions;
  if (userRole === 'admin') {
    selectMenuOptions = adminMenuOptions;
  } else if (userRole === 'supervisor') {
    selectMenuOptions = supervisorMenuOptions;
  } else {
    selectMenuOptions = userMenuOptions;
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
            options={selectMenuOptions}
            isCollapsed={sidebarToggle}
          />
        </div>
        <div className={MainLayoutStyles.layoutContent(sidebarToggle)}>
          <CustomOutlet />
        </div>
      </div>
      <div className={MainLayoutStyles.layoutFooter}>
        {isAuthenticated ? <DashBoardFooter /> : null}
      </div>
    </div>
  );
};
