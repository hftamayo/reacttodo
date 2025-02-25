import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';
import { showApiError } from '@/shared/utils/error/errorUtils';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: toasterMessages.successToaster,
  });
};

export const showErrorToast = (message: string, userMessage: string) => {
  console.log('Message to the developer: ', message);
  showApiError({ httpStatusCode: 500, resultMessage: message }, userMessage);
};
