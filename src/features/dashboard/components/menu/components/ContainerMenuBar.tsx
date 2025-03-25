import React from 'react';
import { DropDownMenuItem } from './DropDownMenuItem';
import { MenuItem } from './MenuItem';
import { MenuProps } from '@/shared/types/menu.type';

export const ContainerMenuBar: React.FC<MenuProps> = (userRole: string) => {
  const userRole = 'admin'; // Get this from your auth context
  return (
    <div className="w-64 text-white p-4">
      <ul className="space-y-2">
        {menuOptions.map((option) => (
          <MenuItem key={option.path} {...option} />
        ))}
      </ul>
      <div className="mt-4">
        <ul>
          <DropDownMenuItem
            userRole={userRole}
            managementOptions={['roles', 'users', 'tasks']}
          />
        </ul>
      </div>
    </div>
  );
};
