import React from 'react';
import { ContainerMenuBar } from './components/ContainerMenuBar';
import { MenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const DashBoardToggleMenuBar: React.FC<MenuProps> = ({
  options,
  isCollapsed,
}) => {
  //const [menuOptions, setMenuOptions] = useState(adminMenuOptions);

  return (
    <div
      className={`
      fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-gray-600 
      transition-all duration-300 overflow-x-hidden
      ${isCollapsed ? 'w-0' : 'w-64'}
    `}
    >
      <ContainerMenuBar options={options} isCollapsed={isCollapsed} />
    </div>
  );
  //   return (
  //     <ContainerMenuBar
  //       menuOptions={menuOptions}
  //       setMenuOptions={setMenuOptions}
  //     />
  //   );
};
