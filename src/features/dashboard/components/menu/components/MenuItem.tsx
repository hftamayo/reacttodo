import React from 'react';
import { Link } from 'wouter';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';
import { MenuLinkProps } from '@/shared/types/menu.type';

export const MenuItem: React.FC<MenuLinkProps> = ({ option, userRole }) => {
  if (option.isDropDownItem) {
    return null;
  }
  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <Link to={option.path} className={DashBoardMenuBarStyles.linkItem}>
        <option.icon className={DashBoardMenuBarStyles.menuIcon} />
        <span>{option.label}</span>
      </Link>
    </li>
  );
};
