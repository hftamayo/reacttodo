import React from 'react';
import ContainerMenuBar from './ContainerMenuBar';
import { MenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

const DashBoardToggleMenuBar: React.FC<MenuProps> = ({
  options,
  isCollapsed,
}) => {
  //const [menuOptions, setMenuOptions] = useState(adminMenuOptions);

  return (
    <div
      className={`${isCollapsed ? 'block' : 'hidden'} ${DashBoardMenuBarStyles.toggleEffectButton}`}
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

export default DashBoardToggleMenuBar;
