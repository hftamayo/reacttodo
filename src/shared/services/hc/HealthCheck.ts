import React, { useEffect } from 'react';
import { useHealthCheck } from '../redux/hooks/useHealthCheck';
import { useNetworkStatus } from '../redux/hooks/useNetworkStatus';
import { showSuccessToast, showErrorToast } from './notificationService';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const HealthCheck = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const { statusInternal, checkHealth } = useHealthCheck(setStatus);
  const isOnline = useNetworkStatus(checkHealth);
  const { text: statusOn = 'Online' } = useTranslation('statusOn');
  const { text: statusOff = 'Offline' } = useTranslation('statusOff');

  useEffect(() => {
    if (statusInternal === 'fail') {
      showErrorToast(`The application is: ${statusOff}`);
    } else if (statusInternal === 'pass') {
      showSuccessToast(`The application is: ${statusOn}`);
    }
  }, [statusInternal, statusOn, statusOff]);

  return null;
};
