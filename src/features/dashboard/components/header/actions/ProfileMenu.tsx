import React from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

const ProfileMenu: React.FC = () => {
  return (
    <div className="relative">
      <button className={DashBoardHeaderProfileMenuStyles.button}>
        <FaUserCircle className="w-6 h-6 mr-2" />

        <div className={DashBoardHeaderProfileMenuStyles.containerFirstLevel}>
          <ul className={DashBoardHeaderProfileMenuStyles.ul}>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaUser className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                Profile
              </a>
            </li>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaCog className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                Settings
              </a>
            </li>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaSignOutAlt className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
};

export default ProfileMenu;
