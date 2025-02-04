import React, { useState } from 'react';
import { Link } from 'wouter';
import { FaRegFileAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { DropDownMenuProps } from '@/shared/types/menu.type';
import { DashBoardMenuBarStyles } from '@/shared/utils/twind/styles';

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ options }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    ['Roles', 'Users', 'Tasks'].includes(option.label)
  );

  return (
    <li className="rounded hover:bg-teal-600 transition-colors duration-200">
      <button
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className="w-full px-3 py-2 flex items-center text-white hover:text-teal-200"
      >
        <FaRegFileAlt className="w-6 h-6 mr-2" />
        <span>Entities</span>
        {isDropDownOpen ? (
          <FaChevronDown className="ml-auto" />
        ) : (
          <FaChevronRight className="ml-auto" />
        )}
      </button>

      {isDropDownOpen && (
        <ul className="ml-6 mt-2 space-y-2">
          {filteredOptions.map((option) => (
            <li
              key={option.path}
              className="rounded hover:bg-teal-700 transition-colors duration-200"
            >
              <Link
                to={option.path}
                className="block px-3 py-2 text-white hover:text-teal-200"
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
