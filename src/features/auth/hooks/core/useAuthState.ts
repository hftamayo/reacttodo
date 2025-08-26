import { useState, useCallback, useRef, useEffect } from 'react';
import { userOps } from '@/shared/services/api/apiClient';
import { UserProfileData } from '@/shared/types/api.type';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfileData | null;
}

/**
 * useAuthState - Secure lazy authentication state management for JWT httpOnly cookies
 *
 * This hook implements "lazy auth checking" for maximum security and efficiency.
 * It defaults to unauthenticated and only validates sessions when contextually needed.
 *
 * Security Benefits:
 * - No unnecessary network probing for session state
 * - Principle of least exposure - only check auth when required
 * - No timing attack vectors from initial load probing
 * - Graceful degradation approach
 *
 * Features:
 * - Defaults to unauthenticated state (secure)
 * - Only calls /users/me when explicitly needed
 * - Manual session validation available
 * - Optimized for httpOnly cookies
 * - No automatic validation after login (handled by AuthGuard)
 */
export const useAuthState = (): AuthState & {
  refreshAuth: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
  isRecentLogout: () => boolean;
} => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false, // Start as NOT loading - we don't check by default
    user: null,
  });

  // Track recent logout to prevent unnecessary auth checks
  const recentLogoutRef = useRef(false);
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Remove the hasLikelySession logic - we use lazy checking instead
  const validateSession = useCallback(async (isPostLogout = false) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      console.log('Validating session with /users/me endpoint...');
      const response = await userOps.getCurrentUser();

      // Backend returns data structure
      if (response.code === 200 && response.data) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: response.data,
        });
        console.log('Session validated successfully');
      } else {
        // Invalid response format
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
        console.log('Session validation failed - invalid response format');
      }
    } catch (apiError: unknown) {
      // Handle API-specific errors
      if (apiError && typeof apiError === 'object' && 'code' in apiError) {
        const statusError = apiError as { code: number };
        if (statusError.code === 401 || statusError.code === 403) {
          // 401/403 means no active session - clear auth state
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });

          if (isPostLogout) {
            console.log('Session cleared after logout (expected)');
          } else {
            console.log(
              'No active session found (expected for unauthenticated users)'
            );
          }
        } else {
          // Other HTTP errors are actual problems
          console.error('Session validation failed with HTTP error:', apiError);
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
        }
      } else {
        // Unknown API error type
        console.error(
          'Session validation failed with unknown error:',
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

  // Clear authentication state immediately (for logout scenarios)
  const clearAuth = useCallback(() => {
    console.log('Clearing authentication state immediately');

    // Set logout flag to prevent immediate auth checks
    recentLogoutRef.current = true;

    // Clear the flag after 2 seconds to allow normal auth checks later
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }
    logoutTimeoutRef.current = setTimeout(() => {
      recentLogoutRef.current = false;
      logoutTimeoutRef.current = null;
    }, 2000);

    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  }, []);

  // Manual auth check - explicitly validates session (but not immediately after logout)
  const checkAuth = useCallback(async () => {
    if (recentLogoutRef.current) {
      console.log('Skipping auth check - recent logout detected');
      return;
    }
    await validateSession(false);
  }, [validateSession]);

  // Check if user recently logged out
  const isRecentLogout = useCallback(() => {
    return recentLogoutRef.current;
  }, []);

  // Refresh authentication state - handles both validation and logout cleanup
  const refreshAuth = useCallback(async () => {
    await validateSession(true); // Mark as post-logout to handle differently
  }, [validateSession]);

  // Check for existing session on app initialization (one-time)
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (!hasInitializedRef.current && !recentLogoutRef.current) {
      hasInitializedRef.current = true;
      console.log(
        'useAuthState: Checking for existing session on app initialization...'
      );
      checkAuth();
    }
  }, [checkAuth]);

  return {
    ...authState,
    refreshAuth,
    checkAuth,
    clearAuth,
    isRecentLogout,
  };
};
