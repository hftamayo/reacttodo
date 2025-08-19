import { FC } from 'react';
import { LoginCard } from '@/features/auth/components/login/LoginCard';
import { LoginProps } from '@/shared/types/domains/user.type';

interface LoginPresenterProps {
  onLogin: (credentials: LoginProps) => Promise<void>;
  onSuccess: () => void;
  onSwitchToSignup: () => void;
  onClose: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const LoginPresenter: FC<LoginPresenterProps> = ({
  onLogin,
  onSuccess,
  onSwitchToSignup,
  onClose,
  isLoading = false,
  error,
}) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Login Error
            </h2>
            <p className="text-red-600">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {/* Pass the props that LoginCard actually needs */}
        <LoginCard
          onClose={onClose}
          onLogin={onLogin}
          onSuccess={onSuccess}
          isLoading={isLoading}
          title="Welcome Back"
        />

        {/* Navigation to Signup */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              disabled={isLoading}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
