import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { useLocation } from 'wouter';
import { useAuth } from '@/features/auth/hooks/core/AuthContext';

export const ActionButtons: React.FC = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const handleLoginClick = () => {
    setLocation('/auth/login');
  };

  const handleSignUpClick = () => {
    setLocation('/auth/signup');
  };

  const handleDashboardClick = () => {
    setLocation('/dashboard');
  };

  // Show loading state during auth check
  if (isLoading) {
    console.log('ActionButtons: Rendering loading state');
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  // Debug log for current render decision
  console.log(
    `ActionButtons: Rendering for ${isAuthenticated ? 'authenticated' : 'unauthenticated'} user`
  );

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
          variant="default"
          className="text-sm sm:text-base px-3 sm:px-4"
          onClick={handleDashboardClick}
        >
          Go to Dashboard
        </Button>
      )}
    </div>
  );
};
