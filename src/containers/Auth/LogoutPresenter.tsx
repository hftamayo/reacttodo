import { FC } from 'react';
import { Link } from 'wouter';
import { LogoutConfirmation } from '@/features/auth/components/logout/LogoutConfirmation';

interface LogoutPresenterProps {
  onLogout: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const LogoutPresenter: FC<LogoutPresenterProps> = ({
  onLogout,
  onCancel,
  isLoading = false,
  error,
}) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Logout Error
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
        {/* Logout Confirmation */}
        <LogoutConfirmation
          onConfirm={onLogout}
          onCancel={onCancel}
          isLoading={isLoading}
        />

        {/* Navigation back to dashboard */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Changed your mind?{' '}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Go back to dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

LogoutPresenter.displayName = 'LogoutPresenter';
