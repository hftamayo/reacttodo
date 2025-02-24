import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: toasterMessages.successToaster,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className: toasterMessages.errorToaster,
  });
};
