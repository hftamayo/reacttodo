import React, { useEffect } from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { healthStatusService } from '../services/HealthStatusService';
import {
  showSuccess,
  showError,
} from '../../../shared/services/notification/notificationService';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const HealthCheck = () => {
  const { statusInternal, checkHealth } = useHealthCheck(() => 'defaultStatus');
  useNetworkStatus(checkHealth);
  const { text: statusOn = 'Online' } = useTranslation('statusOn');
  const { text: statusOff = 'Offline' } = useTranslation('statusOff');

  useEffect(() => {
    if (statusInternal === 'fail') {
      showError('Application is offline', `The application is: ${statusOff}`);
      healthStatusService.updateStatus('Offline');
    } else if (statusInternal === 'pass') {
      showSuccess(`The application is: ${statusOn}`);
      healthStatusService.updateStatus('Online');
    }
  }, [statusInternal, statusOn, statusOff]);

  return null;
};
