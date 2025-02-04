import React from 'react';
import { DropDownMenu } from './DropDownMenu';
import { MenuItem } from './MenuItem';
import { MenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const ContainerMenuBar: React.FC<MenuProps> = ({
  options,
  isCollapsed,
}) => {
  if (isCollapsed) return null;

  return (
    <div className="text-white">
      <ul className="space-y-2">
        {options.map((option) => (
          <MenuItem key={option.path} option={option} />
        ))}
      </ul>

      <div className="mt-4">
        <ul>
          <DropDownMenu options={options} />
        </ul>
      </div>
    </div>
  );
};
