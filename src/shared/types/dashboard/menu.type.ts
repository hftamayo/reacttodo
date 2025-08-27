import { IconName } from '@/features/dashboard/components/menu/constants/iconMap';

export type MenuItemProps = {
  path: string;
  label: string;
  iconName: IconName;
  roles: string[];
  isDropDownItem?: boolean;
};

export type MenuState = {
  items: MenuItemProps[];
};

export type DropDownMenuItemProps = {
  userRole: string;
  dropDownMenuOptions: string[];
};

export type MenuLinkProps = {
  option: MenuItemProps;
  userRole: string;
};

export type MenuBarProps = {
  userRole: string;
  isCollapsed?: boolean;
};

export type ToggleButtonProps = {
  setSidebarToggle: () => void;
  appName: string;
};
