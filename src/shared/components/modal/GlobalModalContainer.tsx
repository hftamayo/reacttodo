import React from 'react';
import CustomModal from '../ui/modal/CustomModal';
import { useModalState } from '../../services/redux/hooks/useModalState';

/**
 * GlobalModalContainer - Centralized modal renderer
 * This component reads from Redux modal state and renders the appropriate modal
 * Place this component at the app root level
 */
export const GlobalModalContainer: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModalState();

  const renderModalContent = () => {
    if (!modalType) return null;

    switch (modalType) {
      case 'login':
        // Import dynamically to avoid circular dependencies for now
        return (
          <div className="p-6 min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <p className="mb-4">Login form will be rendered here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'signup':
        return (
          <div className="p-6 min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="mb-4">Signup form will be implemented here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'resetPassword':
        return (
          <div className="p-6 min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <p className="mb-4">Reset password form will be implemented here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6 min-w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="mb-4">Settings form will be rendered here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'profile':
        return (
          <div className="p-6 min-w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="mb-4">Profile form will be implemented here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        );

      case 'logout':
        return (
          <div className="p-6 min-w-[300px] text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Logout confirmed');
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
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
