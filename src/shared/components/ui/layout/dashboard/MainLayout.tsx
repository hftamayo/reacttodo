import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { selectTheme } from '@/features/settings/store/settingsSlice';
import { DashBoardHeader } from '@/features/dashboard/components/header/DashBoardHeader';
import { DashBoardToggleMenuBar } from '@/features/dashboard/components/menu/DashBoardToggleMenuBar';
import { DashBoardFooter } from '@/features/dashboard/components/footer/DashBoardFooter';
import { APP_NAME } from '@/shared/utils/envvars';
import { MainLayoutStyles } from '@/shared/utils/twind/styles';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = React.memo(({ children }) => {
  const theme = useAppSelector(selectTheme);
  const isAuthenticated = true;
  const userRole = 'admin';

  const [sidebarToggle, setSidebarToggle] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarToggle((prev) => !prev);
  }, []);

  return (
    <div className={MainLayoutStyles.layoutContainer}>
      <div className={MainLayoutStyles.layoutHeader}>
        {isAuthenticated ? (
          <DashBoardHeader
            setSidebarToggle={handleSidebarToggle}
            appName={APP_NAME}
          />
        ) : null}
      </div>
      <div className="flex flex-grow flex-1">
        <DashBoardToggleMenuBar
          userRole={userRole}
          isCollapsed={sidebarToggle}
        />
        <div
          className={`${MainLayoutStyles.layoutContent(sidebarToggle)} flex-1`}
        >
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
      <div className={MainLayoutStyles.layoutFooter}>
        {isAuthenticated ? <DashBoardFooter /> : null}
      </div>
    </div>
  );
});
