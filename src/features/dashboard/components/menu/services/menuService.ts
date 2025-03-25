import { MenuItemProps } from '@/shared/types/menu.type';

export const menuService = {
  hasAccess: (item: MenuItemProps, userRole: string): boolean => {
    return item.roles.includes(userRole);
  },

  getMenuItemsByRole: (
    items: MenuItemProps[],
    role: string
  ): MenuItemProps[] => {
    return items.filter((item) => item.roles.includes(role));
  },
};
