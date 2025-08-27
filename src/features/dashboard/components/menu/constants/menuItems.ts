import { MenuItemProps } from '@/shared/types/dashboard/menu.type';

export const MENU_ITEMS: MenuItemProps[] = [
  {
    path: '/',
    label: 'Home',
    iconName: 'FaHome',
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/entities/roles',
    label: 'Roles',
    iconName: 'FaRegFileAlt',
    roles: ['admin'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/entities/categories',
    label: 'Categories',
    iconName: 'FaRegFileAlt',
    roles: ['admin', 'supervisor'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/entities/users',
    label: 'Users',
    iconName: 'FaRegFileAlt',
    roles: ['admin', 'supervisor'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/tasks',
    label: 'Tasks',
    iconName: 'FaRegFileAlt',
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: true,
  },
  {
    path: '/dashboard/inbox',
    label: 'Inbox',
    iconName: 'FaRegEnvelope',
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/analytics',
    label: 'Metrics',
    iconName: 'FaDeezer',
    roles: ['admin', 'supervisor'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/repository',
    label: 'Repository',
    iconName: 'FaDatabase',
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
  {
    path: '/dashboard/settings',
    label: 'Settings',
    iconName: 'FaCog',
    roles: ['admin', 'supervisor', 'user'],
    isDropDownItem: false,
  },
];
