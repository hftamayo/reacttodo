import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 *
 * This component implements lazy auth checking:
 * - Triggers auth validation when protected route is accessed
 * - Only makes API calls when user tries to access protected content
 * - Provides secure route protection without unnecessary probing
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();

  // Trigger auth check when AuthGuard mounts (user accessing protected route)
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log('Protected route accessed - checking authentication...');
      checkAuth();
    }
  }, [isAuthenticated, isLoading, checkAuth]);

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
