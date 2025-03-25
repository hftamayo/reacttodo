import React, { useState } from 'react';
import { Link } from 'wouter';
import { FaRegFileAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { DropDownMenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const DropDownMenuItem: React.FC<DropDownMenuProps> = ({ options }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    ['Roles', 'Users', 'Tasks'].includes(option.label)
  );

  return (
    <li className={DashBoardMenuBarStyles.listItem}>
      <button
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className={DashBoardMenuBarStyles.menuButton}
      >
        <FaRegFileAlt className="w-6 h-6 mr-2" />
        <span>Management</span>
        {isDropDownOpen ? (
          <FaChevronDown className="ml-auto" />
        ) : (
          <FaChevronRight className="ml-auto" />
        )}
      </button>

      {isDropDownOpen && (
        <ul className="ml-6 mt-2 space-y-2">
          {filteredOptions.map((option) => (
            <li key={option.path} className={DashBoardMenuBarStyles.mappedItem}>
              <Link
                to={option.path}
                className={DashBoardMenuBarStyles.mappedLink}
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
