import { MenuItemProps } from '@/shared/types/menu.type';

export const menuService = {
  filterItemsByRole: (
    items: MenuItemProps[],
    userRole: string
  ): MenuItemProps[] => {
    return items.filter((item) => item.roles.includes(userRole));
  },

  getDropdownItems: (items: MenuItemProps[]): MenuItemProps[] => {
    return items.filter((item) => item.isDropDownItem);
  },

  getMainMenuItems: (items: MenuItemProps[]): MenuItemProps[] => {
    return items.filter((item) => !item.isDropDownItem);
  },
};
