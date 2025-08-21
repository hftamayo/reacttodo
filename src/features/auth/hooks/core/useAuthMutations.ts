import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { authOps } from '@/shared/services/api/apiClient';
import { LoginProps, SignUpProps } from '@/shared/types/domains/user.type';

export const useAuthMutations = () => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginProps) => authOps.login(credentials),
    onSuccess: (data) => {
      // Store auth token if provided by backend
      if (data?.token) {
        localStorage.setItem('authToken', data.token);
      }
      // Handle successful login, e.g., store user data, redirect, etc.
      console.log('Login successful:', data);
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
    onSuccess: () => {
      // Clear authentication token
      localStorage.removeItem('authToken');
      
      // Clear React Query cache to remove user data
      queryClient.clear();
      
      // Redirect to landing page
      setLocation('/landing');
      
      console.log('User logged out successfully');
    },
    onError: (error: Error) => {
      // Even if logout fails on backend, clear local state
      localStorage.removeItem('authToken');
      queryClient.clear();
      setLocation('/landing');
      
      console.error('Logout failed:', error);
    },
  });

  return { loginMutation, signupMutation, logoutMutation };
};
