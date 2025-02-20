import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';
import { ApiError } from '@/shared/types/api.type';

export const isApiError = (error: any): error is ApiError => {
  return (
    error &&
    typeof error === 'object' &&
    'httpStatusCode' in error &&
    'resultMessage' in error
  );
};

export const getErrorMessage = (error: ApiError): string => {
  return `${error.httpStatusCode} ${error.resultMessage}`;
};

export const showApiError = (error: ApiError, userMessage: string) => {
  const errorMessage = getErrorMessage(error);
  console.error('Error:', errorMessage); // Log detailed error for developers
  toast.error(userMessage || 'An error occurred. Please try again later.', {
    className: toasterMessages.errorToaster,
  });
};

export const showUIError = (message: string) => {
  console.error('Validation Error:', message); // Log validation error for developers
  toast.error(
    message || 'Validation error. Please check your input and try again.',
    {
      className: toasterMessages.errorToaster,
    }
  );
};
