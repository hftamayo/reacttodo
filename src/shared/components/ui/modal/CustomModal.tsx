import * as React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onDismiss,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onDismiss}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
