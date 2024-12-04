import DropDownMenu from './menu/DropDownMenu';
import MenuItem from './menu/MenuItem';
import { MenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

const DashBoardMenuBar: React.FC<MenuProps> = ({ options }) => {
  return (
    <div>
      <ul className={DashBoardMenuBarStyles.div2ndLevelContainer}>
        {options.map((option) => (
          <MenuItem key={option.path} option={option} />
        ))}
      </ul>

      <div className={DashBoardMenuBarStyles.div2ndLevelContainer}>
        <ul className={DashBoardMenuBarStyles.unorderedItem2ndLevel}>
          <DropDownMenu options={options} />
        </ul>
      </div>
    </div>
  );
};

export default DashBoardMenuBar;
