import React from 'react';
import ContainerActions from './actions/ContainerActions';

const DashBoardHeader: React.FC = () => {
  return (
    <div className="w-full">
      <ContainerActions />
    </div>
  );
};

export default DashBoardHeader;
