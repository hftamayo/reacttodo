import { MenuItem } from '@/shared/types/menu.type';
import {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCog,
  FaPoll,
} from 'react-icons/fa';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'home',
    path: '/',
    label: 'home',
    icon: FaHome,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    id: 'roles',
    path: '/dashboard/entities/roles',
    label: 'roles',
    icon: FaRegFileAlt,
    roles: ['admin'],
  },
  {
    id: 'users',
    path: '/dashboard/entities/users',
    label: 'users',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor'],
  },
  {
    id: 'tasks',
    path: '/taskboard',
    label: 'tasks',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    id: 'inbox',
    path: '/dashboard/inbox',
    label: 'inbox',
    icon: FaRegEnvelope,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    id: 'metrics',
    path: '/dashboard/settings',
    label: 'settings',
    icon: FaCog,
    roles: ['admin', 'supervisor'],
  },
  {
    id: 'reports',
    path: '/dashboard/reports',
    label: 'reports',
    icon: FaPoll,
    roles: ['admin', 'supervisor', 'user'],
  },
];
