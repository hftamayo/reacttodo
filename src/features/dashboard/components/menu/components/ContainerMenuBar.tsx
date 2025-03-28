import React from 'react';
import { DropDownMenuItem } from './DropDownMenuItem';
import { MenuItem } from './MenuItem';
import { useMenuOptions } from '../hooks/useMenuOptions';

export const ContainerMenuBar: React.FC<{ userRole: string }> = ({
  userRole,
}) => {
  const { mainMenuItems } = useMenuOptions(userRole);

  return (
    <div className="w-64 text-white p-4">
      <ul className="space-y-2">
        {mainMenuItems.map((option) => (
          <MenuItem key={option.path} option={option} userRole={userRole} />
        ))}
      </ul>
      <div className="mt-4">
        <ul>
          <DropDownMenuItem userRole={userRole} />
        </ul>
      </div>
    </div>
  );
};
