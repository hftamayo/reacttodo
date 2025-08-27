import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { SignUpFormProps, SignUpProps } from '@/shared/types/domains/user.type';
import { signupSchema } from '../../schemas';

/**
 * Custom hook for signup form with Zod validation
 *
 * @param onSignUp - Function to handle signup submission
 * @param onSuccess - Optional callback for successful signup
 * @param onClose - Optional callback to close the form
 * @param defaultCredentials - Optional default form values
 * @returns Form state and handlers with validation
 */
export const useSignUpForm = ({
  onSignUp,
  onSuccess,
  onClose,
  defaultCredentials = {},
}: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpProps>({
    resolver: zodResolver(signupSchema) as any, // Type assertion to fix Zod coerce typing issue
    defaultValues: {
      name: defaultCredentials.name || '',
      age: defaultCredentials.age || 13, // Default to minimum reasonable age
      email: defaultCredentials.email || '',
      password: defaultCredentials.password || '',
      confirmPassword: defaultCredentials.confirmPassword || '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      // Data is properly validated and typed by Zod resolver
      await onSignUp(data as unknown as SignUpProps);
      showSuccess('Account created successfully! It requires activation.');
      onSuccess?.();
      reset();
      return true;
    } catch (error) {
      console.error('SignUp form submission error:', error);
      // Error is handled by the parent component or error boundary
      return false;
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isValid,
    isSubmitting,
    handleSignUpSubmit,
    onClose,
  };
};
