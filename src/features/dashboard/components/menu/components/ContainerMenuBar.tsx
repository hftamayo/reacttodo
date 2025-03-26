import React from 'react';
import { DropDownMenuItem } from './DropDownMenuItem';
import { MenuItem } from './MenuItem';
import { DropDownMenuItemProps } from '@/shared/types/menu.type';
import { useMenuOptions } from '../hooks/useMenuOptions';

export const ContainerMenuBar: React.FC<DropDownMenuItemProps> = ({
  userRole,
  managementOptions,
}) => {
  const menuOptions = useMenuOptions(userRole);

  const mainMenuItems = menuOptions.filter(
    (option) => !managementOptions.includes(option.label.toLowerCase())
  );

  return (
    <div className="w-64 text-white p-4">
      <ul className="space-y-2">
        {mainMenuItems.map((option) => (
          <MenuItem key={option.path} option={option} userRole={userRole} />
        ))}
      </ul>
      <div className="mt-4">
        <ul>
          <DropDownMenuItem
            userRole={userRole}
            managementOptions={managementOptions}
          />
        </ul>
      </div>
    </div>
  );
};
