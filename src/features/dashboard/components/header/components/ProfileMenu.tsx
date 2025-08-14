import React from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/ui/menu/DropDownMenu';
import { useModalState } from '@/shared/services/redux/hooks/useModalState';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

export const ProfileMenu: React.FC = () => {
  const { group } = useTranslation('dropDownHeaderBar');
  const { openModal } = useModalState();

  if (!group) {
    return null;
  }

  const handleProfileClick = () => {
    openModal('profile');
  };

  const handleSettingsClick = () => {
    openModal('settings');
  };

  const handleLogoutClick = () => {
    openModal('logout');
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={DashBoardHeaderProfileMenuStyles.button}>
            <FaUserCircle className="w-6 h-6 mr-2" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={handleProfileClick}>
              <FaUser className={DashBoardHeaderProfileMenuStyles.icon} />
              {group.profile}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleSettingsClick}>
              <FaCog className={DashBoardHeaderProfileMenuStyles.icon} />
              {group.settings}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogoutClick}>
              <FaSignOutAlt className={DashBoardHeaderProfileMenuStyles.icon} />
              {group.logout}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
