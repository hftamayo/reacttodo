import { ApiError } from '@/shared/types/api.type';

const isApiError = (error: any): error is ApiError => {
  return error && typeof error === 'object' && 'resultMessage' in error;
};

export const getErrorMessage = (error: ApiError | unknown): string => {
  if (isApiError(error)) {
    return error.resultMessage;
  }
  console.error('Unhandled error:', error); // Optional: Log the error for debugging
  return 'An unknown error occurred. Please check your network connection and try again.';
};
