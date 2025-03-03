import React, { useEffect } from 'react';
import { useHealthCheck } from '../redux/hooks/useHealthCheck';
import { useNetworkStatus } from '../redux/hooks/useNetworkStatus';
import { showSuccess, showError } from '../notification/notificationService';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const HealthCheck = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const { statusInternal, checkHealth } = useHealthCheck(setStatus);
  useNetworkStatus(checkHealth);
  const { text: statusOn = 'Online' } = useTranslation('statusOn');
  const { text: statusOff = 'Offline' } = useTranslation('statusOff');

  // Fix 2: Add state to track if toast has been shown already
  const [hasShownStatus, setHasShownStatus] = React.useState({
    pass: false,
    fail: false,
  });

  useEffect(() => {
    // Only show toast if status changes and hasn't been shown for this status yet
    if (statusInternal === 'fail' && !hasShownStatus.fail) {
      showError('Application is offline', `The application is: ${statusOff}`);
      setStatus('Offline');
      setHasShownStatus((prev) => ({ ...prev, fail: true, pass: false }));
    } else if (statusInternal === 'pass' && !hasShownStatus.pass) {
      showSuccess(`The application is: ${statusOn}`);
      setStatus('Online');
      setHasShownStatus((prev) => ({ ...prev, pass: true, fail: false }));
    }
  }, [statusInternal, statusOn, statusOff, hasShownStatus, setStatus]);

  return null;
};
