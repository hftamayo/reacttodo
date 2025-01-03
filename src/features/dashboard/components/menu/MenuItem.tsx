import React from 'react';
import { Link } from 'wouter';
import { MenuOptionProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

const MenuItem: React.FC<MenuOptionProps> = ({ option }) => {
  return (
    <li key={option.path} className={DashBoardMenuBarStyles.listItem}>
      <Link to={option.path} className={DashBoardMenuBarStyles.linkItem}>
        <option.icon className={DashBoardMenuBarStyles.menuIcon} />
        {option.label}
      </Link>
    </li>
  );
};

export default MenuItem;
