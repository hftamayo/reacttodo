export type MenuOption = {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
};

export type MenuProps = {
  options: MenuOption[];
  isCollapsed: boolean;
  onCollapse: () => void;
};
