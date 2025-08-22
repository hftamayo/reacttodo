import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from './useAuthState';
import { UserProfileData } from '@/shared/types/api.type';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfileData | null;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Provides authentication context to the entire app
 *
 * This provider wraps the app and makes auth state available via useAuth hook.
 * It uses the modernized useAuthState hook that validates sessions via API calls.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

/**
 * useAuth - Access authentication state and refresh function
 *
 * This hook provides access to:
 * - isAuthenticated: boolean - whether user is logged in
 * - isLoading: boolean - whether auth check is in progress
 * - user: UserProfileData | null - current user profile data
 * - refreshAuth: () => Promise<void> - manually refresh auth state
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
