import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';
import { ApiError } from '@/shared/types/api.type';

const isApiError = (error: any): error is ApiError => {
  return error && typeof error === 'object' && 'resultMessage' in error;
};

export const getErrorMessage = (error: ApiError | unknown): string => {
  if (isApiError(error)) {
    return error.resultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  console.error('Unhandled error:', error); // Optional: Log the error for debugging
  return 'An unknown error occurred. Please check your network connection and try again.';
};

export const showError = (error: ApiError | unknown) => {
  const errorMessage = getErrorMessage(error);
  toast.error(errorMessage, {
    className: toasterMessages.errorToaster,
  });
};
