import { useMutation } from '@tanstack/react-query';
import { authOps } from '@/shared/services/api/apiClient';
import { LoginProps, SignUpProps } from '@/shared/types/domains/user.type';

export const useAuthMutations = () => {
  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginProps) => authOps.login(credentials),
    onSuccess: (data) => {
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
      // Clear secure storage
      // Redirect to login
    },
  });

  return { loginMutation, signupMutation, logoutMutation };
};
