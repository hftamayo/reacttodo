import React from 'react';
import CustomModal from '../ui/modal/CustomModal';
import { useModalState } from '../../services/redux/hooks/useModalState';
import { LoginCard } from '@/features/auth/components/login/LoginCard';
import { ProfileCard } from '@/features/dashboard/components/header/components/ProfileCard';
import { LogoutConfirmation } from '@/features/auth/components/logout/LogoutConfirmation';
import { UpdateTaskCard } from '@/features/task/components/update/UpdateTaskCard';
import { SettingsContainer } from '@/containers/Settings/SettingsContainer';

/**
 * GlobalModalContainer - Centralized modal renderer
 * This component reads from Redux modal state and renders the appropriate modal
 * Place this component at the app root level
 */
export const GlobalModalContainer: React.FC = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalState();

  const renderModalContent = () => {
    if (!modalType) return null;

    switch (modalType) {
      case 'login':
        return (
          <LoginCard
            onClose={closeModal}
            title={modalProps?.title}
            {...modalProps}
          />
        );

      //     case 'signup':
      //       return (
      //         <SignupCard
      //           onClose={closeModal}
      //           title={modalProps?.title}
      //           {...modalProps}
      //         />
      //       );

      //   case 'resetPassword':
      //     return (
      //       <ResetPasswordCard
      //         onClose={closeModal}
      //         title={modalProps?.title}
      //         {...modalProps}
      //       />
      //     );

      case 'settings':
        return (
          <SettingsContainer
            onCancel={closeModal}
            onSubmit={() => {
              // Handle settings save
              console.log('Settings saved');
              closeModal();
            }}
            {...modalProps}
          />
        );

      case 'updateTask':
        return (
          <UpdateTaskCard
            id={modalProps?.id}
            title={modalProps?.title}
            description={modalProps?.description}
            done={modalProps?.done}
            owner={modalProps?.owner}
            onClose={closeModal}
            isUpdating={modalProps?.isUpdating || false}
          />
        );

      case 'profile':
        return (
          <ProfileCard
            onClose={closeModal}
            title={modalProps?.title}
            {...modalProps}
          />
        );

      case 'logout':
        return (
          <LogoutConfirmation
            onConfirm={() => {
              // TODO: Implement actual logout logic
              console.log('User logged out');
              closeModal();
            }}
            onCancel={closeModal}
            {...modalProps}
          />
        );

      case 'customSearch':
        return (
          <div className="p-4 sm:p-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Custom Search
            </h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Custom search options will be implemented here
            </p>
            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        );

      case 'reportOptions':
        return (
          <div className="p-4 sm:p-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Report Options
            </h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Report configuration options will be implemented here
            </p>
            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        );

      case 'exportReport':
        return (
          <div className="p-4 sm:p-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Export Report
            </h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Export options will be implemented here
            </p>
            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        );

      default:
        return (
          <div className="p-4 sm:p-6 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-red-600">
              Unknown Modal
            </h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Modal type "{modalType}" is not implemented
            </p>
            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <CustomModal isOpen={isOpen} onDismiss={closeModal}>
      {renderModalContent()}
    </CustomModal>
  );
};
