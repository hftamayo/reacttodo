export type MenuItemProps = {
  id?: string;
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  roles?: string[];
};

export type DropDownMenuProps = {
  options: MenuItemProps[];
};

export type MenuProps = {
  options: MenuItemProps[];
  isCollapsed?: boolean;
};

export type ToggleButtonProps = {
  setSidebarToggle: () => void;
  appName: string;
};
