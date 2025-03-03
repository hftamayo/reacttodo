import React, { useEffect } from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const HealthCheck: React.FC = () => {
  const metrics = useHealthCheck();
  const { text: statusOn = 'Online' } = useTranslation('statusOn');
  const { text: statusOff = 'Offline' } = useTranslation('statusOff');
  const { text: statusNoConnection = 'No Connection' } =
    useTranslation('statusNoConnection');

  // Component now only handles display-related side effects
  useEffect(() => {
    // Status updates and notifications are now handled by healthService
    console.debug('Health Status Updated:', metrics.status);
  }, [metrics.status]);

  return null;
};
