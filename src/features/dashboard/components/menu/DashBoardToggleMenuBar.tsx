import React from 'react';
import ContainerMenuBar from './ContainerMenuBar';
import { MenuProps } from '@/shared/types/menu.type';

const DashBoardToggleMenuBar: React.FC<MenuProps> = ({
  options,
  isCollapsed,
}) => {
  //const [menuOptions, setMenuOptions] = useState(adminMenuOptions);

  return (
    <div>
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
