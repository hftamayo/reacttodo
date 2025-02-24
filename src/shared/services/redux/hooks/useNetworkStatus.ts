import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const useNetworkStatus = (checkHealth: () => void) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored', {
        className: toasterMessages.successToaster,
      });
      checkHealth(); // Immediate check when coming back online
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Connection lost', {
        className: toasterMessages.errorToaster,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkHealth]);

  return isOnline;
};
