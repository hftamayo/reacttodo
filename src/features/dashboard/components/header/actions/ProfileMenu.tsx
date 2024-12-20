import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/services/redux/storeHooks';
import { toggleTheme } from '@/shared/services/redux/themeSlice';
import {
  FaUserCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.theme.theme);

  const handleToggle = () => {
    console.log('dark mode logic');
    dispatch(toggleTheme());
  };

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
            <button
              onClick={handleToggle}
              className={DashBoardHeaderProfileMenuStyles.li}
            >
              {theme === 'light' ? (
                <FaToggleOff
                  className={DashBoardHeaderProfileMenuStyles.icon}
                />
              ) : (
                <FaToggleOn className={DashBoardHeaderProfileMenuStyles.icon} />
              )}
              <a href="#" className="block w-full">
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
              </a>
            </button>
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
