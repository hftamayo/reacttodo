import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
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
 * - Redirects unauthenticated users to landing page
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const [, setLocation] = useLocation();

  // Trigger auth check when AuthGuard mounts (user accessing protected route)
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log('Protected route accessed - checking authentication...');
      checkAuth();
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  // Redirect unauthenticated users after auth check completes
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('User not authenticated - redirecting to landing page');
      setLocation('/landing');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Verifying authentication...</div>
      </div>
    );
  }

  // If not authenticated, redirect is handled by useEffect above
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
};
