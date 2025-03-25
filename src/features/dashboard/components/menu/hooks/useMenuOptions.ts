import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { MENU_ITEMS } from '../constants/menuItems';

export const useMenuOptions = (userRole: string) => {
  const { group } = useTranslation('sideBarDashboard');

  if (!group) {
    return [];
  }

  return MENU_ITEMS.filter((item) => item.roles.includes(userRole)).map(
    (item) => ({
      path: item.path,
      label: group[item.label],
      icon: item.icon,
    })
  );
};
