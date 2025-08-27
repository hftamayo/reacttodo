import * as React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  backgroundStyle?: 'gradient' | 'solid' | 'minimal';
  backgroundIntensity?: 'light' | 'medium' | 'strong';
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onDismiss,
  children,
  backgroundStyle = 'gradient',
  backgroundIntensity = 'medium',
}) => {
  if (!isOpen) return null;

  // Background overlay classes based on style and intensity
  const getBackgroundClasses = () => {
    switch (backgroundStyle) {
      case 'gradient':
        switch (backgroundIntensity) {
          case 'light':
            return 'bg-gradient-to-br from-black/40 via-black/50 to-black/60';
          case 'medium':
            return 'bg-gradient-to-br from-black/50 via-black/70 to-black/85';
          case 'strong':
            return 'bg-gradient-to-br from-black/60 via-black/80 to-black/95';
          default:
            return 'bg-gradient-to-br from-black/50 via-black/70 to-black/85';
        }
      case 'solid':
        switch (backgroundIntensity) {
          case 'light':
            return 'bg-black/50';
          case 'medium':
            return 'bg-black/70';
          case 'strong':
            return 'bg-black/90';
          default:
            return 'bg-black/70';
        }
      case 'minimal':
        return 'bg-black/40';
      default:
        return 'bg-gradient-to-br from-black/50 via-black/70 to-black/85';
    }
  };

  // Modal content styling based on background style
  const getModalClasses = () => {
    const baseClasses =
      'relative z-[60] rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[90vh] overflow-y-auto bg-white border border-gray-200';
    return baseClasses;
  };

  const backgroundClasses = getBackgroundClasses();
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className={`absolute inset-0 ${backgroundClasses}`}
        onClick={onDismiss}
      />

      {/* Modal content */}
      <div className={getModalClasses()}>{children}</div>
    </div>
  );
};

export default CustomModal;
