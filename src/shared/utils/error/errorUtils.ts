import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';
import { ApiError } from '@/shared/types/api.type';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

const isApiError = (error: any): error is ApiError => {
  return error && typeof error === 'object' && 'resultMessage' in error;
};

export const getErrorMessage = (error: ApiError | Error): string => {
  if (isApiError(error)) {
    return error.resultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  console.error('Unhandled error:', error); // Optional: Log the error for debugging
  return 'An unknown error occurred. Please check your network connection and try again.';
};

export const showError = (error: ApiError | Error) => {
  const { text: errorComponent } = useTranslation('errorComponent');
  const errorMessage = getErrorMessage(error);
  console.error('Error:', errorMessage); // Log detailed error for developers
  toast.error(`${errorComponent}`, {
    className: toasterMessages.errorToaster,
  });
};
