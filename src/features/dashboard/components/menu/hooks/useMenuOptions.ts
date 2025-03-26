import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { MENU_ITEMS } from '../constants/menuItems';
import { MenuItemProps } from '@/shared/types/menu.type';

export const useMenuOptions = (userRole: string): MenuItemProps[] => {
  const { group } = useTranslation('sideBarDashboard');

  if (!group) {
    return [];
  }

  return MENU_ITEMS.filter((item) => item.roles.includes(userRole)).map(
    (item) => ({
      path: item.path,
      label: group[item.label],
      icon: item.icon,
      roles: item.roles,
    })
  );
};
