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

  const handleSettingsClick = () => {
    setModalContent(<ViewSettingsForm />);
    setIsModalOpen(true);
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
                {group.profile}
              </a>
            </li>
            <li className={DashBoardHeaderProfileMenuStyles.li}>
              <FaCog className={DashBoardHeaderProfileMenuStyles.icon} />
              <button
                onClick={handleSettingsClick}
                className="block w-full text-left"
              >
                {group.settings}
              </button>
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

      <CustomModal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        {modalContent}
      </CustomModal>
    </div>
  );
};

export default ProfileMenu;
