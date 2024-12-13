import React from 'react';
import DashBoardToggleMenuBar from './menu/DashBoardToggleMenuBar';
import ContainerActions from './actions/ContainerActions';

const DashBoardHeader: React.FC = () => {
  return (
    <div className="flex">
      <ContainerActions />
      <DashBoardToggleMenuBar />
    </div>
  );
};

export default DashBoardHeader;
