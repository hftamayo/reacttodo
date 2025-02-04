import React from 'react';
import { DropDownMenu } from './DropDownMenu';
import { MenuItem } from './MenuItem';
import { MenuProps } from '@/shared/types/menu.type';

export const ContainerMenuBar: React.FC<MenuProps> = ({ options }) => {
  return (
    <div className="w-64 text-white p-4">
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
