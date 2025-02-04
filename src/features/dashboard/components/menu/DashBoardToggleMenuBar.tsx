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
      fixed top-[64px] left-0 w-64 bg-gray-600 h-[calc(100vh-64px)]
      transition-transform duration-300 ease-in-out
      ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
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
