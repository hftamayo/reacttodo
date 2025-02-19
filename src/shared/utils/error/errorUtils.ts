import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';
import { ApiError } from '@/shared/types/api.type';

export const getErrorMessage = (error: ApiError): string => {
  return `${error.httpStatusCode} ${error.resultMessage}`;
};

export const showError = (error: ApiError, userMessage: string) => {
  const errorMessage = getErrorMessage(error);
  console.error('Error:', errorMessage); // Log detailed error for developers
  toast.error(userMessage || 'An error occurred. Please try again later.', {
    className: toasterMessages.errorToaster,
  });
};
