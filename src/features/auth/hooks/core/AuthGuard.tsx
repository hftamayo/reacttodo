import React, { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from './AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 *
 * This component implements lazy auth checking with optimization to prevent
 * multiple auth checks when multiple instances mount simultaneously.
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const [, setLocation] = useLocation();
  const hasTriggeredCheck = useRef(false);

  // Trigger auth check when AuthGuard mounts (user accessing protected route)
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !hasTriggeredCheck.current) {
      console.log('Protected route accessed - checking authentication...');
      hasTriggeredCheck.current = true;
      checkAuth();
    } else if (isAuthenticated) {
      console.log('User already authenticated, no need to check');
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  // Redirect unauthenticated users after auth check completes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && hasTriggeredCheck.current) {
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

  console.log('AuthGuard: Rendering protected content');
  return <>{children}</>;
};
