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
            return 'bg-gradient-to-br from-black/10 via-black/20 to-black/30 backdrop-blur-[2px]';
          case 'medium':
            return 'bg-gradient-to-br from-black/20 via-black/40 to-black/60 backdrop-blur-sm';
          case 'strong':
            return 'bg-gradient-to-br from-black/30 via-black/50 to-black/70 backdrop-blur-md';
          default:
            return 'bg-gradient-to-br from-black/20 via-black/40 to-black/60 backdrop-blur-sm';
        }
      case 'solid':
        switch (backgroundIntensity) {
          case 'light':
            return 'bg-black/20 backdrop-blur-[1px]';
          case 'medium':
            return 'bg-black/40 backdrop-blur-sm';
          case 'strong':
            return 'bg-black/60 backdrop-blur-md';
          default:
            return 'bg-black/40 backdrop-blur-sm';
        }
      case 'minimal':
        return 'bg-black/10 backdrop-blur-[1px]';
      default:
        return 'bg-gradient-to-br from-black/20 via-black/40 to-black/60 backdrop-blur-sm';
    }
  };

  // Modal content styling based on background style
  const getModalClasses = () => {
    const baseClasses = 'relative z-10 rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out';
    
    switch (backgroundStyle) {
      case 'gradient':
        return `${baseClasses} bg-white/95 backdrop-blur-md border border-white/20`;
      case 'solid':
        return `${baseClasses} bg-white/90 backdrop-blur-sm border border-gray-200/50`;
      case 'minimal':
        return `${baseClasses} bg-white/98 backdrop-blur-[2px] border border-gray-100/30`;
      default:
        return `${baseClasses} bg-white/95 backdrop-blur-md border border-white/20`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced background overlay with customizable effects and smooth transitions */}
      <div
        className={`fixed inset-0 ${getBackgroundClasses()} transition-all duration-300 ease-out`}
        onClick={onDismiss}
      ></div>
      
      {/* Modal content with enhanced styling and animations */}
      <div className={getModalClasses()}>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
