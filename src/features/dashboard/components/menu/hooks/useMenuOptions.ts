import {
  FaHome,
  FaRegEnvelope,
  FaRegFileAlt,
  FaPoll,
  FaCog,
} from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const menuOptions = () => {
  const { group } = useTranslation('sideBarDashboard');

  if (!group) {
    return {
      adminMenuOptions: [],
      userMenuOptions: [],
      supervisorMenuOptions: [],
    };
  }

  return {
    adminMenuOptions: [
      { path: '/', label: group.home, icon: FaHome },
      {
        path: '/dashboard/entities/roles',
        label: group.roles,
        icon: FaRegFileAlt,
      },
      {
        path: '/dashboard/entities/users',
        label: group.users,
        icon: FaRegFileAlt,
      },
      { path: '/taskboard', label: group.tasks, icon: FaRegFileAlt },
      { path: '/dashboard/inbox', label: group.inbox, icon: FaRegEnvelope },
      { path: '/dashboard/settings', label: group.settings, icon: FaCog },
      { path: '/dashboard/reports', label: group.reports, icon: FaPoll },
    ],

    userMenuOptions: [
      { path: '/', label: group.home, icon: FaHome },
      { path: '/taskboard', label: group.tasks, icon: FaRegFileAlt },
      { path: '/dashboard/inbox', label: group.inbox, icon: FaRegEnvelope },
      { path: '/dashboard/reports', label: group.reports, icon: FaPoll },
    ],

    supervisorMenuOptions: [
      { path: '/', label: group.home, icon: FaHome },
      {
        path: '/dashboard/entities/users',
        label: group.users,
        icon: FaRegFileAlt,
      },
      { path: '/taskboard', label: group.tasks, icon: FaRegFileAlt },
      { path: '/dashboard/inbox', label: group.inbox, icon: FaRegEnvelope },
      { path: '/dashboard/reports', label: group.reports, icon: FaPoll },
    ],
  };
};
