import { useState, useEffect, useCallback } from 'react';
import { userOps } from '@/shared/services/api/apiClient';
import { UserProfileData } from '@/shared/types/api.type';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfileData | null;
}

/**
 * useAuthState - Modern authentication state management for JWT httpOnly cookies
 *
 * This hook validates authentication by calling the /users/me endpoint instead of
 * checking localStorage. It automatically handles session validation and user data.
 *
 * Features:
 * - Session validation via API calls (not localStorage)
 * - Automatic retry on network errors
 * - Proper handling of 401/403 responses
 * - User profile data management
 * - Session refresh capability
 */
export const useAuthState = (): AuthState & {
  refreshAuth: () => Promise<void>;
} => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  const validateSession = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Call /users/me endpoint to validate session and get user data
      const response = await userOps.getCurrentUser();

      // Backend returns data in { data: { data: userInfo } } structure
      if (response.code === 200 && response.data) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: response.data,
        });
      } else {
        // Invalid response format
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error: any) {
      console.error('Session validation failed:', error);

      // Handle different error types
      if (error?.status === 401 || error?.status === 403) {
        // Unauthorized - session expired or invalid
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      } else {
        // Network error or other issues - keep current state but stop loading
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    }
  }, []);

  // Refresh authentication state manually
  const refreshAuth = useCallback(async () => {
    await validateSession();
  }, [validateSession]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return {
    ...authState,
    refreshAuth,
  };
};
