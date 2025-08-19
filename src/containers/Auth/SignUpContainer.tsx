import { FC, ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'wouter';
import { SignUpPresenter } from './SignUpPresenter';
import { useAuthMutations } from '@/features/auth/hooks/core/useAuthMutations';
import { showError } from '@/shared/services/notification/notificationService';
import { SignUpProps } from '@/shared/types/domains/user.type';

const SignUpFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-xl font-semibold mb-4">Sign Up Failed to Load</h2>
    <p className="text-gray-600">
      {error?.message ?? 'Please try refreshing the page'}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Try Again
    </button>
  </div>
);

export const SignUpContainer: FC = () => {
  const [, setLocation] = useLocation();
  const { signupMutation } = useAuthMutations();

  const handleSignUp = async (credentials: SignUpProps) => {
    await signupMutation.mutateAsync(credentials);
  };

  const handleSignUpSuccess = () => {
    // Redirect to login after successful signup
    setLocation('/auth/login');
  };

  const handleSwitchToLogin = () => {
    setLocation('/auth/login');
  };

  const handleClose = () => {
    setLocation('/');
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Sign Up Error:', error, errorInfo);
    showError('An error occurred during sign up');
  };

  return (
    <ErrorBoundary FallbackComponent={SignUpFallback} onError={handleError}>
      <SignUpPresenter
        onSignUp={handleSignUp}
        onSuccess={handleSignUpSuccess}
        onSwitchToLogin={handleSwitchToLogin}
        onClose={handleClose}
        isLoading={signupMutation.isPending}
        error={signupMutation.error as Error}
      />
    </ErrorBoundary>
  );
};
