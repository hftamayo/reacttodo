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

const getErrorMessage = (error: ApiError): string => {
  return `${error.httpStatusCode} ${error.resultMessage}`;
};

export const showError = (error: ApiError | string, userMessage?: string) => {
  if (isApiError(error)) {
    const errorMessage = getErrorMessage(error);
    console.error('Developer Error:', errorMessage); // Log detailed error for developers
    toast.error(userMessage ?? 'An error occurred. Please try again later.', {
      className: toasterMessages.errorToaster,
    });
  } else {
    console.error('Validation Error:', error); // Log validation error for developers
    toast.error(
      userMessage ?? 'Validation error. Please check your input and try again.',
      {
        className: toasterMessages.errorToaster,
      }
    );
  }
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    className: toasterMessages.successToaster,
  });
};
