import { MenuItemProps } from '@/shared/types/menu.type';
import {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaDeezer,
  FaDatabase,
} from 'react-icons/fa';

export const MENU_ITEMS: MenuItemProps[] = [
  {
    path: '/',
    label: 'Home',
    icon: FaHome,
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/entities/roles',
    label: 'Roles',
    icon: FaRegFileAlt,
    roles: ['admin'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/entities/categories',
    label: 'Categories',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/entities/users',
    label: 'Users',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/entities/taskboard',
    label: 'Tasks',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/inbox',
    label: 'Inbox',
    icon: FaRegEnvelope,
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/metrics',
    label: 'Metrics',
    icon: FaDeezer,
    roles: ['admin', 'supervisor'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/repository',
    label: 'Repository',
    icon: FaDatabase,
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
];
