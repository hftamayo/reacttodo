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
    <div className="flex items-center gap-2">
      <Button variant="link" onClick={handleLoginClick}>
        Login
      </Button>
      <span className="text-gray-400">|</span>
      <Button variant="link" onClick={handleSignUpClick}>
        Sign Up
      </Button>
    </div>
  );
};
