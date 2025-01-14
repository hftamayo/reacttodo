import React from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

const ProfileMenu: React.FC = () => {
  const { group } = useTranslation('dropDownHeaderBar');

  if (!group) {
    return null;
  }

  return (
    <div className="relative">
      <button className={DashBoardHeaderProfileMenuStyles.button}>
        <FaUserCircle className="w-6 h-6 mr-2" />

        <div className={DashBoardHeaderProfileMenuStyles.containerFirstLevel}>
          <ul className={DashBoardHeaderProfileMenuStyles.ul}>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaUser className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                {group.profile}
              </a>
            </li>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaCog className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                {group.settings}
              </a>
            </li>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaSignOutAlt className={DashBoardHeaderProfileMenuStyles.icon} />
              <a href="#" className="block w-full">
                {group.logout}
              </a>
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
};

export default ProfileMenu;
