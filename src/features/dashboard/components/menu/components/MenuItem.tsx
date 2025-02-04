import React from 'react';
import { Link } from 'wouter';
import { MenuOptionProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const MenuItem: React.FC<MenuOptionProps> = ({ option }) => {
  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <Link to={option.path} className={DashBoardMenuBarStyles.linkItem}>
        <option.icon className={DashBoardMenuBarStyles.menuIcon} />
        <span>{option.label}</span>
      </Link>
    </li>
  );
};
