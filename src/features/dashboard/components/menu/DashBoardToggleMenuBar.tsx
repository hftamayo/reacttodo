import React, { useState } from 'react';
import ContainerMenuBar from './ContainerMenuBar';
import {
  adminMenuOptions,
  supervisorMenuOptions,
  userMenuOptions,
} from '../../services/menuOptions';

const DashBoardToggleMenuBar: React.FC = () => {
  //const [menuOptions, setMenuOptions] = useState(adminMenuOptions);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userRole = 'admin';

  let menuOptions;
  if (userRole === 'admin') {
    menuOptions = adminMenuOptions;
  } else if (userRole === 'supervisor') {
    menuOptions = supervisorMenuOptions;
  } else {
    menuOptions = userMenuOptions;
  }

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      {!isCollapsed && (
        <ContainerMenuBar
          options={menuOptions}
          isCollapsed={isCollapsed}
          onCollapse={handleCollapse}
        />
      )}
    </div>
  );
  //   return (
  //     <ContainerMenuBar
  //       menuOptions={menuOptions}
  //       setMenuOptions={setMenuOptions}
  //     />
  //   );
};

export default DashBoardToggleMenuBar;
