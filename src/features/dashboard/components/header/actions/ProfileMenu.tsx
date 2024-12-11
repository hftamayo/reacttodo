import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileMenu: React.FC = () => {
  return (
    <div className="relative">
      <button className="text-white group">
        <FaUserCircle className="w-6 h-6 mt-1" />
        <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
          <ul className="py-2 text-sm text-gray-950">
            <li>
              <a href="">Profile</a>
            </li>
            <li>
              <a href="">Settings</a>
            </li>
            <li>
              <a href="">Log Out</a>
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
};

export default ProfileMenu;
