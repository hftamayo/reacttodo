import React from 'react';
import { Link } from 'wouter';
import { MenuOptionProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const MenuItem: React.FC<MenuOptionProps> = ({ option }) => {
  return (
    <li className="rounded hover:bg-teal-600 transition-colors duration-200">
      <Link
        to={option.path}
        className="px-3 py-2 flex items-center text-white hover:text-teal-200"
      >
        <option.icon className="w-6 h-6 mr-2" />
        <span>{option.label}</span>
      </Link>
    </li>
  );
};
