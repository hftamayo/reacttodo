import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { authOps } from '@/shared/services/api/apiClient';
import { LoginProps, SignUpProps } from '@/shared/types/domains/user.type';
import { useAuth } from './AuthContext';

export const useAuthMutations = () => {
  const [, setLocation] = useLocation();
  const { clearAuth } = useAuth(); // Use clearAuth for immediate logout

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginProps) => authOps.login(credentials),
    onSuccess: async (data) => {
      console.log('Login successful:', data);

      // Don't call refreshAuth() after login - let AuthGuard handle validation
      // This avoids the race condition where the JWT cookie might not be set yet
      
      // Redirect to dashboard - AuthGuard will validate the session when needed
      setLocation('/dashboard');
    },
    onError: (error: Error) => {
      // Handle login error
      console.error('Login failed:', error);
    },
  });

  // Signup Mutation
  const signupMutation = useMutation({
    mutationFn: (user: SignUpProps) => authOps.signup(user),
    onSuccess: (data) => {
      // Handle successful signup, e.g., redirect to login page
      console.log('Signup successful:', data);
    },
    onError: (error: Error) => {
      // Handle signup error
      console.error('Signup failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authOps.logout(),
    onSuccess: async () => {
      // Clear local auth state immediately after logout
      // This avoids unnecessary API calls and provides instant feedback
      clearAuth();
      
      // Redirect to landing page
      setLocation('/landing');
      console.log('User logged out successfully');
    },
    onError: (error: Error) => {
      // Handle logout error
      console.error('Logout failed:', error);
    },
  });

  return { loginMutation, signupMutation, logoutMutation };
};
