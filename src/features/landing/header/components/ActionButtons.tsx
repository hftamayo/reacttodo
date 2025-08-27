import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { useLocation } from 'wouter';
import { useAuth } from '@/features/auth/hooks/core/AuthContext';
import { useModalState } from '@/shared/services/redux/hooks/useModalState';

export const ActionButtons: React.FC = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { openModal } = useModalState();

  const handleLoginClick = () => {
    openModal('login', { title: 'Welcome Back!' });
  };

  const handleSignUpClick = () => {
    openModal('signup', { title: 'Join Our Community' });
  };

  const handleDashboardClick = () => {
    setLocation('/dashboard');
  };

  // Show loading state during auth check
  if (isLoading) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {!isAuthenticated ? (
        // Unauthenticated user - Show Login and Sign Up buttons
        <>
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
        </>
      ) : (
        // Authenticated user - Show Dashboard link
        <Button
          variant="link"
          className="text-sm sm:text-base px-2 sm:px-3"
          onClick={handleDashboardClick}
        >
          Dashboard
        </Button>
      )}
    </div>
  );
};
