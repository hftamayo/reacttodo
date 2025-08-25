import React from 'react';
import { Link } from 'wouter';
import { FaQuestion } from 'react-icons/fa'; // Fallback icon
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';
import { MenuLinkProps } from '@/shared/types/dashboard/menu.type';
import { iconMap } from '../constants/iconMap';

export const MenuItem: React.FC<MenuLinkProps> = ({ option, userRole }) => {
  if (option.isDropDownItem) {
    return null;
  }

  const Icon = iconMap[option.iconName] || FaQuestion; // Fallback to FaQuestion if icon not found

  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <Link to={option.path} className={DashBoardMenuBarStyles.linkItem}>
        <Icon className={DashBoardMenuBarStyles.menuIcon} />
        <span>{option.label}</span>
      </Link>
    </li>
  );
};
