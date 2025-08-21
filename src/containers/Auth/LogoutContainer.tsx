import { FC, ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'wouter';
import { LogoutPresenter } from './LogoutPresenter';
import { useAuthMutations } from '@/features/auth/hooks/core/useAuthMutations';
import { showError } from '@/shared/services/notification/notificationService';

const LogoutFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-xl font-semibold mb-4">Logout Failed to Load</h2>
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

export const LogoutContainer: FC = () => {
  const [, setLocation] = useLocation();
  const { logoutMutation } = useAuthMutations();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const handleCancel = () => {
    // Navigate back or to dashboard
    setLocation('/');
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Logout Error:', error, errorInfo);
    showError('An error occurred during logout');
  };

  return (
    <ErrorBoundary FallbackComponent={LogoutFallback} onError={handleError}>
      <LogoutPresenter
        onLogout={handleLogout}
        onCancel={handleCancel}
        isLoading={logoutMutation.isPending}
        error={logoutMutation.error as Error}
      />
    </ErrorBoundary>
  );
};
