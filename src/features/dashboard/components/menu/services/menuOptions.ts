import {
  FaHome,
  FaRegEnvelope,
  FaRegFileAlt,
  FaPoll,
  FaCog,
} from 'react-icons/fa';

export const adminMenuOptions = [
  { path: '', label: '', icon: FaHome },
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/dashboard/entities/roles', label: 'Roles', icon: FaRegFileAlt },
  { path: '/dashboard/entities/users', label: 'Users', icon: FaRegFileAlt },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/settings', label: 'Settings', icon: FaCog },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];

export const userMenuOptions = [
  { path: '', label: '', icon: FaHome },
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];

export const supervisorMenuOptions = [
  { path: '', label: '', icon: FaHome },
  { path: '/dashboard/home', label: 'Home', icon: FaHome },
  { path: '/dashboard/entities/users', label: 'Users', icon: FaRegFileAlt },
  { path: '/taskboard', label: 'Tasks', icon: FaRegFileAlt },
  { path: '/dashboard/inbox', label: 'Inbox', icon: FaRegEnvelope },
  { path: '/dashboard/reports', label: 'Reports', icon: FaPoll },
];
