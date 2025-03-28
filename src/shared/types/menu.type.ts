export type MenuItemProps = {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
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
  dropDownMenuOptions: string[];
  isCollapsed?: boolean;
};

export type ToggleButtonProps = {
  setSidebarToggle: () => void;
  appName: string;
};
