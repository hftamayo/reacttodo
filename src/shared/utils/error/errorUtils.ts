import { ApiError } from '@/shared/types/api.type';

export const getErrorMessage = (error: ApiError | unknown): string => {
  if (typeof error === 'object' && error !== null && 'resultMessage' in error) {
    return (error as ApiError).resultMessage;
  }
  return 'An unknown error occurred. Please check your network connection and try again.';
};
