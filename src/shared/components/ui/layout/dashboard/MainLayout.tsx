import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { CustomOutlet } from '@/shared/services/routing/CustomOutlet';
import { SkeletonCustomOutlet } from '@/shared/services/routing/SkeletonCustomOutlet';
import { DashBoardHeader } from '@/features/dashboard/components/header/DashBoardHeader';
import { DashBoardToggleMenuBar } from '@/features/dashboard/components/menu/DashBoardToggleMenuBar';
import { DashBoardFooter } from '@/features/dashboard/components/footer/DashBoardFooter';
import { menuOptions } from '@/features/dashboard/components/menu/config/menuOptions';
import { APP_NAME } from '@/shared/utils/envvars';
import { MainLayoutStyles } from '@/shared/utils/twind/styles';

export const MainLayout: React.FC = () => {
  const theme = useAppSelector((state: any) => state.theme.theme);
  const isAuthenticated = true;
  const userRole = 'admin';
  const { adminMenuOptions, supervisorMenuOptions, userMenuOptions } =
    menuOptions();

  const [sidebarToggle, setSidebarToggle] = useState(true);

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
      <div className="flex flex-grow flex-1">
        <DashBoardToggleMenuBar
          options={selectMenuOptions}
          isCollapsed={sidebarToggle}
        />
        <div
          className={`${MainLayoutStyles.layoutContent(sidebarToggle)} flex-1`}
        >
          <div className="flex-1">
            <CustomOutlet />
          </div>
        </div>
      </div>
      <div className={MainLayoutStyles.layoutFooter}>
        {isAuthenticated ? <DashBoardFooter /> : null}
      </div>
    </div>
  );
};
