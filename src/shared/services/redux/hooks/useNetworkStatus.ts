import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const useNetworkStatus = (checkHealth: () => void) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  // Fix 1: Add debounce for online status change
  const checkHealthTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    toast.success('Connection restored', {
      className: toasterMessages.successToaster,
    });

    // Debounce checkHealth call
    if (checkHealthTimeout.current) {
      clearTimeout(checkHealthTimeout.current);
    }

    checkHealthTimeout.current = setTimeout(() => {
      checkHealth();
    }, 500);
  }, [checkHealth]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    toast.error('Connection lost', {
      className: toasterMessages.errorToaster,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (checkHealthTimeout.current) {
        clearTimeout(checkHealthTimeout.current);
      }
    };
  }, [handleOnline, handleOffline]);

  return isOnline;
};
