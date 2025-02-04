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
      fixed top-[64px] left-0 h-full bg-gray-600 transition-all duration-300
      ${isCollapsed ? 'w-0 overflow-hidden' : 'w-64'}
    `}
    >
      <div className="px-4 py-2">
        <ContainerMenuBar options={options} isCollapsed={isCollapsed} />
      </div>
    </div>
  );
  //   return (
  //     <ContainerMenuBar
  //       menuOptions={menuOptions}
  //       setMenuOptions={setMenuOptions}
  //     />
  //   );
};
