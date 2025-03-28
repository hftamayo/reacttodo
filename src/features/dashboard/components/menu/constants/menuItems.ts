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
    label: 'home',
    icon: FaHome,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    path: '/dashboard/entities/roles',
    label: 'roles',
    icon: FaRegFileAlt,
    roles: ['admin'],
  },
  {
    path: '/dashboard/entities/users',
    label: 'users',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor'],
  },
  {
    path: '/taskboard',
    label: 'tasks',
    icon: FaRegFileAlt,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    path: '/dashboard/inbox',
    label: 'inbox',
    icon: FaRegEnvelope,
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    path: '/dashboard/metrics',
    label: 'metrics',
    icon: FaDeezer,
    roles: ['admin', 'supervisor'],
  },
  {
    path: '/dashboard/repository',
    label: 'repository',
    icon: FaDatabase,
    roles: ['admin', 'supervisor', 'user'],
  },
];
