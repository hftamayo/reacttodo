import { Component, ErrorInfo, ReactNode } from 'react';
import { showError } from '@/shared/services/notification/notificationService';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    showError('A critical error occurred. Please refresh the page.');

    // Log detailed error info for debugging
    console.error('ErrorBoundary caught an error:', {
      error,
      componentStack: errorInfo.componentStack,
    });

    this.props.onError?.(error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // Handle function fallback with reset capability
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      // Or use provided fallback node
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback with retry button
      return (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-bold text-red-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={this.resetError}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
