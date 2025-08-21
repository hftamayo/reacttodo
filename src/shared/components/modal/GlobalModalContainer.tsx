import React from 'react';
import CustomModal from '../ui/modal/CustomModal';
import { useModalState } from '../../services/redux/hooks/useModalState';
import { LoginCard } from '@/features/auth/components/login/LoginCard';
import { SignUpCard } from '@/features/auth/components/signup/SignUpCard';
import { ProfileCard } from '@/features/dashboard/components/header/components/ProfileCard';
import { LogoutConfirmation } from '@/features/auth/components/logout/LogoutConfirmation';
import { UpdateTaskCard } from '@/features/task/components/update/UpdateTaskCard';
import { SettingsContainer } from '@/containers/Settings/SettingsContainer';
import { useAuthMutations } from '@/features/auth/hooks/core/useAuthMutations';
import { LoginProps, SignUpProps } from '@/shared/types/domains/user.type';

/**
 * GlobalModalContainer - Centralized modal renderer
 * This component reads from Redux modal state and renders the appropriate modal
 * Place this component at the app root level
 */
export const GlobalModalContainer: React.FC = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalState();
  const { loginMutation, signupMutation, logoutMutation } = useAuthMutations();

  // Authentication handlers for modal context
  const handleLogin = async (credentials: LoginProps) => {
    await loginMutation.mutateAsync(credentials);
  };

  const handleSignUp = async (credentials: SignUpProps) => {
    await signupMutation.mutateAsync(credentials);
  };

  const handleAuthSuccess = () => {
    // Close modal and optionally redirect or refresh state
    closeModal();
    // Could add additional success logic here
  };

  // Get modal background style based on modal type
  const getModalBackgroundStyle = (type: string) => {
    switch (type) {
      case 'login':
      case 'signup':
        return {
          backgroundStyle: 'gradient' as const,
          backgroundIntensity: 'medium' as const,
        };
      case 'settings':
        return {
          backgroundStyle: 'gradient' as const,
          backgroundIntensity: 'light' as const,
        };
      case 'updateTask':
        return {
          backgroundStyle: 'solid' as const,
          backgroundIntensity: 'medium' as const,
        };
      case 'profile':
        return {
          backgroundStyle: 'gradient' as const,
          backgroundIntensity: 'strong' as const,
        };
      case 'logout':
        return {
          backgroundStyle: 'solid' as const,
          backgroundIntensity: 'strong' as const,
        };
      case 'demo':
        return {
          backgroundStyle: 'gradient' as const,
          backgroundIntensity: 'medium' as const,
        };
      default:
        return {
          backgroundStyle: 'gradient' as const,
          backgroundIntensity: 'medium' as const,
        };
    }
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const renderModalContent = () => {
    if (!modalType) return null;

    switch (modalType) {
      case 'login':
        return (
          <LoginCard
            onClose={closeModal}
            onLogin={handleLogin}
            onSuccess={handleAuthSuccess}
            isLoading={loginMutation.isPending}
            title={modalProps?.title}
            {...modalProps}
          />
        );

      case 'signup':
        return (
          <SignUpCard
            onClose={closeModal}
            onSignUp={handleSignUp}
            onSuccess={handleAuthSuccess}
            isLoading={signupMutation.isPending}
            title={modalProps?.title}
            {...modalProps}
          />
        );

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
            onConfirm={handleLogout}
            onCancel={closeModal}
            isLoading={logoutMutation.isPending}
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

      case 'demo':
        return (
          <div className="p-4 sm:p-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
              🎨 Modal Background Demo
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  This modal showcases the new background effects!
                </p>
                <p className="text-xs text-gray-500">
                  Current: {backgroundConfig.backgroundStyle} (
                  {backgroundConfig.backgroundIntensity})
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gray-100 rounded text-center">
                  <span className="font-semibold">Gradient</span>
                  <br />
                  <span className="text-gray-600">Beautiful overlay</span>
                </div>
                <div className="p-2 bg-gray-100 rounded text-center">
                  <span className="font-semibold">Solid</span>
                  <br />
                  <span className="text-gray-600">Clean & simple</span>
                </div>
                <div className="p-2 bg-gray-100 rounded text-center">
                  <span className="font-semibold">Minimal</span>
                  <br />
                  <span className="text-gray-600">Subtle effect</span>
                </div>
                <div className="p-2 bg-gray-100 rounded text-center">
                  <span className="font-semibold">Intensities</span>
                  <br />
                  <span className="text-gray-600">Light/Medium/Strong</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Close Demo
              </button>
            </div>
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

  const backgroundConfig = getModalBackgroundStyle(modalType || '');

  return (
    <CustomModal
      isOpen={isOpen}
      onDismiss={closeModal}
      backgroundStyle={backgroundConfig.backgroundStyle}
      backgroundIntensity={backgroundConfig.backgroundIntensity}
    >
      {renderModalContent()}
    </CustomModal>
  );
};
