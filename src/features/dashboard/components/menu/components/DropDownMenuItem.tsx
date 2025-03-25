import React, { useState } from 'react';
import { Link } from 'wouter';
import { useMenuOptions } from '../hooks/useMenuOptions';
import { FaRegFileAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { DropDownMenuItemProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const DropDownMenuItem: React.FC<DropDownMenuItemProps> = ({
  userRole,
  managementOptions = ['roles', 'users', 'tasks'],
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const menuOptions = useMenuOptions(userRole);

  const filteredOptions = menuOptions.filter((option) =>
    managementOptions.includes(option.label.toLowerCase())
  );

  if (filteredOptions.length === 0) {
    return null;
  }

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
