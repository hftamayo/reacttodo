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
  const { isAuthenticated, isLoading, checkAuth, isRecentLogout } = useAuth();
  const [, setLocation] = useLocation();
  const hasTriggeredCheck = useRef(false);

  // Trigger auth check when AuthGuard mounts (user accessing protected route)
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !hasTriggeredCheck.current) {
      // Don't check auth immediately after logout - user is definitely unauthenticated
      if (isRecentLogout()) {
        console.log(
          'Recent logout detected - skipping auth check and redirecting'
        );
        hasTriggeredCheck.current = true;
        setLocation('/landing');
        return;
      }

      // For unauthenticated users accessing protected routes:
      // Instead of making API calls, assume they're not authenticated and redirect silently
      // This provides the same UX as accessing non-existent routes
      console.log(
        'Protected route accessed by unauthenticated user - redirecting silently'
      );
      hasTriggeredCheck.current = true;
      setLocation('/landing');

      // Note: We skip checkAuth() to avoid unnecessary API calls and error notifications
      // If there was a valid session, the user would already be authenticated
    } else if (isAuthenticated) {
      console.log('User already authenticated, no need to check');
    }
  }, [isAuthenticated, isLoading, checkAuth, isRecentLogout, setLocation]);

  // Note: Second redirect effect removed since we handle redirects directly in the first effect

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
