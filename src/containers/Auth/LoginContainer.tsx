import { FC, ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'wouter';
import { LoginPresenter } from './LoginPresenter';
import { useAuthMutations } from '@/features/auth/hooks/core/useAuthMutations';
import { showError } from '@/shared/services/notification/notificationService';
import { LoginProps } from '@/shared/types/domains/user.type';

const LoginFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-xl font-semibold mb-4">Login Failed to Load</h2>
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

export const LoginContainer: FC = () => {
  const [, setLocation] = useLocation();
  const { loginMutation } = useAuthMutations();

  const handleLogin = async (credentials: LoginProps) => {
    await loginMutation.mutateAsync(credentials);
  };

  const handleLoginSuccess = () => {
    // Redirect to dashboard after successful login
    setLocation('/');
  };

  const handleSwitchToSignup = () => {
    setLocation('/auth/signup');
  };

  const handleClose = () => {
    setLocation('/');
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Login Error:', error, errorInfo);
    showError('An error occurred during login');
  };

  return (
    <ErrorBoundary FallbackComponent={LoginFallback} onError={handleError}>
      <LoginPresenter
        onLogin={handleLogin}
        onSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
        onClose={handleClose}
        isLoading={loginMutation.isPending}
        error={loginMutation.error as Error}
      />
    </ErrorBoundary>
  );
};
