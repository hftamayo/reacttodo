/**
 * Modern Authentication System Exports
 *
 * This module exports the modernized authentication system that uses:
 * - JWT httpOnly cookies for session management
 * - API-based session validation via /users/me endpoint
 * - React Context for global auth state management
 * - Automatic session refresh on login/logout
 */

// Main auth context and hooks
export { AuthProvider, useAuth } from './core/AuthContext';

// Auth mutations for login/logout/signup
export { useAuthMutations } from './core/useAuthMutations';

// Route protection
export { AuthGuard } from './core/AuthGuard';

// Legacy hook (deprecated - use useAuth instead)
export { useAuthState } from './core/useAuthState';
