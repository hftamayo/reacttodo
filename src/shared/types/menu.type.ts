export type MenuItemProps = {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: string[];
};

export type DropDownMenuItemProps = {
  userRole: string;
  managementOptions: string[];
};

export type MenuLinkProps = {
  option: MenuItemProps;
  userRole: string;
};

export type MenuBarProps = {
  userRole: string;
  managementOptions: string[];
  isCollapsed?: boolean;
};

export type ToggleButtonProps = {
  setSidebarToggle: () => void;
  appName: string;
};
