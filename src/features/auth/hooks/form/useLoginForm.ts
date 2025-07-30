import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { LoginProps, LoginFormProps } from '@/shared/types/domains/user.type';

export const useLoginForm = ({
  credentials,
  onClose,
  onSuccess,
  onLogin,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }, // Use isValid instead of isDirty
  } = useForm<LoginProps>({
    defaultValues: {
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe ?? false,
    },
    mode: 'onChange', // Enable real-time validation
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await onLogin(data);
      showSuccess('Login successful');
      onSuccess?.();
      reset();
      return true;
    } catch (error) {
      console.error('Login form submission error:', error);
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
    isValid, // Better for login forms
    isSubmitting,
    handleLoginSubmit,
    onClose,
  };
};
