import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showSuccess } from '@/shared/services/notification/notificationService';
import { SignUpProps } from '@/shared/types/domains/user.type';
import { signupSchema, type SignupFormData } from '../../schemas';

// Updated interface to accept LoginFormData
interface ZodSignUpFormProps
  extends Omit<SignUpProps, 'onSignUp' | 'defaultCredentials'> {
  onSignUp: (credentials: SignupFormData) => Promise<void>;
  defaultCredentials?: Partial<SignupFormData>;
}

export const useSignUpForm = ({
  onSignUp,
  onSuccess,
  onClose,
  defaultCredentials = {},
}: ZodSignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: defaultCredentials.name || '',
      age: defaultCredentials.age || 0,
      email: defaultCredentials.email || '',
      password: defaultCredentials.password || '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      // Data is properly typed by Zod resolver
      await onSubmit(data as unknown as SignupFormData);
      showSuccess('Signup successful');
      onSuccess?.();
      reset();
      return true;
    } catch (error) {
      console.error('SignUp form submission error:', error);
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
