import React from 'react';
import { useAuthState } from './useAuthState';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to landing/login if user is not authenticated
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthState();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Verifying authentication...</div>
      </div>
    );
  }

  // If not authenticated, this will be handled by App.tsx
  // This component assumes the user is already authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
