import React from 'react';
import ContainerMenuBar from './ContainerMenuBar';
import { MenuProps } from '@/shared/types/menu.type';

const DashBoardToggleMenuBar: React.FC<MenuProps> = ({
  options,
  isCollapsed,
  onCollapse,
}) => {
  //const [menuOptions, setMenuOptions] = useState(adminMenuOptions);

  return (
    <div>
      {!isCollapsed && (
        <ContainerMenuBar
          options={options}
          isCollapsed={isCollapsed}
          onCollapse={onCollapse}
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
