import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { useModalState } from '@/shared/services/redux/hooks/useModalState';

export const ActionButtons: React.FC = () => {
  const { openModal } = useModalState();

  const handleLoginClick = () => {
    openModal('login');
  };

  const handleSignUpClick = () => {
    openModal('signup');
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        variant="link"
        className="text-sm sm:text-base px-2 sm:px-3"
        onClick={handleLoginClick}
      >
        Login
      </Button>
      <span className="text-gray-400 text-xs sm:text-sm">|</span>
      <Button
        variant="link"
        className="text-sm sm:text-base px-2 sm:px-3"
        onClick={handleSignUpClick}
      >
        Sign Up
      </Button>
    </div>
  );
};
