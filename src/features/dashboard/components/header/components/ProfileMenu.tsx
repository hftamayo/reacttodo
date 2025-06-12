import React, { useState } from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/ui/menu/DropDownMenu';
import { SettingsContainer } from '@/containers/Settings/SettingsContainer';
import CustomModal from '@/shared/components/ui/modal/CustomModal';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

export const ProfileMenu: React.FC = () => {
  const { group } = useTranslation('dropDownHeaderBar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  if (!group) {
    return null;
  }

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    setModalContent(
      <SettingsContainer
        onCancel={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
    );
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
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

      <CustomModal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        {modalContent}
      </CustomModal>
    </div>
  );
};
