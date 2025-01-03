import React, { useState } from 'react';
import { Link } from 'wouter';
import { FaRegFileAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { DropDownMenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label === 'Roles' ||
      option.label === 'Users' ||
      option.label === 'Tasks'
  );
  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <button
        onClick={handleDropDown}
        className={DashBoardMenuBarStyles.menuButton}
      >
        <FaRegFileAlt className={DashBoardMenuBarStyles.menuIcon2ndLevel} />
        Entities
        {isDropDownOpen ? (
          <FaChevronDown className={DashBoardMenuBarStyles.menuIcon3rdLevel} />
        ) : (
          <FaChevronRight className={DashBoardMenuBarStyles.menuIcon3rdLevel} />
        )}
      </button>
      {isDropDownOpen && (
        <ul className={DashBoardMenuBarStyles.unorderedItem3rdLevel}>
          {filteredOptions.map((option) => (
            <li key={option.path} className={DashBoardMenuBarStyles.mappedItem}>
              <Link to={option.path}>{option.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropDownMenu;
