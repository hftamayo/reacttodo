import React from 'react';
import { Link } from 'wouter';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';
import { MenuLinkProps } from '@/shared/types/menu.type';
import { iconMap } from '../constants/iconMap';

export const MenuItem: React.FC<MenuLinkProps> = ({ option, userRole }) => {
  if (option.isDropDownItem) {
    return null;
  }

  const Icon = iconMap[option.iconName];

  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <Link to={option.path} className={DashBoardMenuBarStyles.linkItem}>
        <Icon className={DashBoardMenuBarStyles.menuIcon} />
        <span>{option.label}</span>
      </Link>
    </li>
  );
};
