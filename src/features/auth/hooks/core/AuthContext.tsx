import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from './useAuthState';
import { UserProfileData } from '@/shared/types/api.type';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfileData | null;
  refreshAuth: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Provides secure lazy authentication context to the entire app
 *
 * This provider implements lazy auth checking for maximum security:
 * - Defaults to unauthenticated state
 * - Only validates sessions when explicitly needed
 * - No automatic probing of auth endpoints
 * - Secure by design with principle of least exposure
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

/**
 * useAuth - Access secure lazy authentication state and functions
 *
 * This hook provides access to:
 * - isAuthenticated: boolean - whether user is logged in (defaults to false)
 * - isLoading: boolean - whether auth check is in progress
 * - user: UserProfileData | null - current user profile data
 * - refreshAuth: () => Promise<void> - validate session (called after logout)
 * - checkAuth: () => Promise<void> - validate session (called when accessing protected routes)
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
