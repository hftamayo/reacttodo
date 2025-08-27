import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { LoginFormProps } from '@/shared/types/domains/user.type';
import { loginSchema, type LoginFormData } from '../../schemas';

// Updated interface to accept LoginFormData
interface ZodLoginFormProps
  extends Omit<LoginFormProps, 'onLogin' | 'defaultCredentials'> {
  onLogin: (credentials: LoginFormData) => Promise<void>;
  defaultCredentials?: Partial<LoginFormData>;
}

export const useLoginForm = ({
  onLogin,
  onSuccess,
  onClose,
  defaultCredentials = {},
}: ZodLoginFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
      // Data is properly typed by Zod resolver
      await onLogin(data as unknown as LoginFormData);
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
