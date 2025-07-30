import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { LoginProps, LoginFormProps } from '@/shared/types/domains/user.type';

export const useLoginForm = ({
  onLogin,
  onSuccess,
  onClose,
  defaultCredentials = {},
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginProps>({
    defaultValues: {
      email: defaultCredentials.email || '',
      password: defaultCredentials.password || '',
      rememberMe: defaultCredentials.rememberMe || false,
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
    isValid,
    isSubmitting,
    handleLoginSubmit,
    onClose,
  };
};
