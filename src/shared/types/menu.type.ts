type MenuOption = {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
};

export type MenuOptionProps = {
  option: MenuOption;
};

export type DropDownMenuProps = {
  options: MenuOption[];
};

export type MenuProps = {
  options: MenuOption[];
  isCollapsed: boolean;
  onCollapse: () => void;
};
