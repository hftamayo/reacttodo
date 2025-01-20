import React, { useState } from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { DashBoardHeaderProfileMenuStyles } from '@/shared/utils/twind/styles';
import ViewSettingsForm from '@/features/settings/components/ViewSettingsForm';
import CustomModal from '@/shared/components/ui/forms/CustomModal';

const ProfileMenu: React.FC = () => {
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
    console.log('Settings clicked');
    setModalContent(<ViewSettingsForm />);
    setIsModalOpen(true);
    console.log('Modal content set:', <ViewSettingsForm />);
    console.log('Modal open state:', isModalOpen);
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="relative">
      <button className={DashBoardHeaderProfileMenuStyles.button}>
        <FaUserCircle className="w-6 h-6 mr-2" />
      </button>

      <div className={DashBoardHeaderProfileMenuStyles.containerFirstLevel}>
        <ul className={DashBoardHeaderProfileMenuStyles.ul}>
          <li className={DashBoardHeaderProfileMenuStyles.li}>
            <FaUser className={DashBoardHeaderProfileMenuStyles.icon} />
            <button onClick={handleProfileClick} className="block w-full">
              {group.profile}
            </button>
          </li>
          <li className={DashBoardHeaderProfileMenuStyles.li}>
            <FaCog className={DashBoardHeaderProfileMenuStyles.icon} />
            <button onClick={handleSettingsClick} className="block w-full">
              {group.settings}
            </button>
          </li>
          <li className={DashBoardHeaderProfileMenuStyles.li}>
            <FaSignOutAlt className={DashBoardHeaderProfileMenuStyles.icon} />
            <button onClick={handleLogoutClick} className="block w-full">
              {group.logout}
            </button>
          </li>
        </ul>
      </div>

      <CustomModal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        {modalContent}
      </CustomModal>
    </div>
  );
};

export default ProfileMenu;
