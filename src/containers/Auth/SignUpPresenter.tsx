import { FC } from 'react';
import { SignUpCard } from '@/features/auth/components/signup/SignUpCard';
import { SignUpProps } from '@/shared/types/domains/user.type';

interface SignUpPresenterProps {
  onSignUp: (credentials: SignUpProps) => Promise<void>;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  onClose: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const SignUpPresenter: FC<SignUpPresenterProps> = ({
  onSignUp,
  onSuccess,
  onSwitchToLogin,
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
              Sign Up Error
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
        {/* Pass the props that SignUpCard actually needs */}
        <SignUpCard
          onClose={onClose}
          onSignUp={onSignUp}
          onSuccess={onSuccess}
          isLoading={isLoading}
          title="Create Account"
        />

        {/* Navigation to Login */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              disabled={isLoading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

SignUpPresenter.displayName = 'SignUpPresenter';
