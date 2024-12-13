import React from 'react';
import CustomOutlet from '@/shared/services/routing/CustomOutlet';
import DashBoardHeader from '@/features/dashboard/components/header/DashBoardHeader';
import DashBoardToggleMenuBar from '@/features/dashboard/components/header/menu/DashBoardToggleMenuBar';
import DashBoardFooter from '@/features/dashboard/components/footer/DashBoardFooter';
import { MainLayoutStyles } from '@/shared/utils/twind/styles';

const MainLayout = () => {
  const isAuthenticated = true;

  return (
    <div className={MainLayoutStyles.layoutContainer}>
      <div className={MainLayoutStyles.layoutHeader}>
        {isAuthenticated ? <DashBoardHeader /> : null}
      </div>
      <div className="flex">
        <DashBoardToggleMenuBar />
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
