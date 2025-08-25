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
 * - Proper handling of 401/403 responses (normal for unauthenticated users)
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
      // Note: 401 response is NORMAL for unauthenticated users, not an error
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
    } catch (apiError: unknown) {
      // Handle API-specific errors
      if (apiError && typeof apiError === 'object' && 'code' in apiError) {
        const statusError = apiError as { code: number };
        if (statusError.code === 401 || statusError.code === 403) {
          // 401/403 is NORMAL for unauthenticated users - not an error
          // This means no valid session exists, which is expected behavior
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
          // Log this as info, not error - it's expected for unauthenticated users
          console.log(
            'No active session found (expected for unauthenticated users)'
          );
        } else {
          // Other HTTP errors (500, network issues, etc.) are actual problems
          console.error('Session validation failed with HTTP error:', apiError);
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
        }
      } else {
        // Unknown API error type - log and clear auth state
        console.error(
          'Session validation failed with unknown API error:',
          apiError
        );
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
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
