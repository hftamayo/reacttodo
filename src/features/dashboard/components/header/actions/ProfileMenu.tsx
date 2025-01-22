import React, { useState } from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/ui/dashboard/menu/dropdown-menu';
import ViewSettingsForm from '@/features/settings/components/ViewSettingsForm';
import CustomModal from '@/shared/components/ui/forms/CustomModal';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';

const ProfileMenu: React.FC = () => {
  const { group } = useTranslation('dropDownHeaderBar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const initialValues = {
    setting1: 'value1',
    setting2: 'value2',
  };

  if (!group) {
    return null;
  }

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    setModalContent(
      <ViewSettingsForm
        initialValues={initialValues}
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

export default ProfileMenu;
