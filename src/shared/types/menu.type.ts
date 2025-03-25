export type MenuItem = {
  id?: string;
  path: string;
  label: string;
  translationKey?: string;
  icon: React.ComponentType<any>;
  roles?: string[];
};

export type DropDownMenuProps = {
  options: MenuItem[];
};

export type MenuProps = {
  options: MenuItem[];
  isCollapsed?: boolean;
};

export type ToggleButtonProps = {
  setSidebarToggle: () => void;
  appName: string;
};
