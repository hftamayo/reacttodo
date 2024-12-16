import React from 'react';
import DropDownMenu from './DropDownMenu';
import MenuItem from './MenuItem';
import { MenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

const ContainerMenuBar: React.FC<MenuProps> = ({ options, isCollapsed }) => {
  return (
    <div
      className={`${isCollapsed ? 'hidden' : 'block'} ${DashBoardMenuBarStyles.toggleEffectButton}`}
    >
      <ul className={DashBoardMenuBarStyles.div2ndLevelContainer}>
        {options.map((option) => (
          <MenuItem key={option.path} option={option} />
        ))}
      </ul>

      <div className={DashBoardMenuBarStyles.div2ndLevelContainer}>
        <ul className={DashBoardMenuBarStyles.unorderedItem2ndLevel}>
          <DropDownMenu options={options} />
        </ul>
      </div>
    </div>
  );
};

export default ContainerMenuBar;
