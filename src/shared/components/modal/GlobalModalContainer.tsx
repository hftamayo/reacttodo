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
          <div className="p-6 min-w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Custom Search</h2>
            <p className="mb-4">
              Custom search options will be implemented here
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'reportOptions':
        return (
          <div className="p-6 min-w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Report Options</h2>
            <p className="mb-4">
              Report configuration options will be implemented here
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'exportReport':
        return (
          <div className="p-6 min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Export Report</h2>
            <p className="mb-4">Export options will be implemented here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      default:
        return (
          <div className="p-6 min-w-[300px]">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Unknown Modal
            </h2>
            <p className="mb-4">Modal type "{modalType}" is not implemented</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
