import { ErrorInfo } from 'react';
import { showError } from '@/shared/services/notification/notificationService';

export const useErrorHandler = (component: string) => {
  return {
    handleError: (error: Error, errorInfo: ErrorInfo) => {
      // Show user-friendly notification
      showError(`${component} encountered an error`);

      // Log detailed error for debugging
      console.error(`${component} Error:`, {
        error,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });

      // Could add error reporting service call here
      // reportErrorToService(error, component);
    },
  };
};
