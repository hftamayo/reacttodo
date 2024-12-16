import {
  FaHome,
  FaRegEnvelope,
  FaRegFileAlt,
  FaPoll,
  FaCog,
} from 'react-icons/fa';

export const adminMenuOptions = [
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/dashboard/entities/roles', label: 'Roles', icon: FaRegFileAlt },
  { path: '/dashboard/entities/users', label: 'Users', icon: FaRegFileAlt },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/settings', label: 'Settings', icon: FaCog },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];

export const userMenuOptions = [
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];

export const supervisorMenuOptions = [
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/dashboard/entities/users', label: 'Users', icon: FaRegFileAlt },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];
