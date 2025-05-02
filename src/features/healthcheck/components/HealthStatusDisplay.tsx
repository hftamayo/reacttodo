import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { HealthStatus } from '@/shared/types/healthcheck.type';
import { MAX_RETRIES } from '@/shared/utils/envvars';

const STATUS_CLASSES: Record<HealthStatus, string> = {
  ONLINE: DashBoardFooterStyles.footer_text,
  OFFLINE: DashBoardFooterStyles.footer_text_offline,
  NO_CONNECTION: DashBoardFooterStyles.footer_text_no_connection,
  CHECKING: DashBoardFooterStyles.footer_text_checking,
};

export const HealthStatusDisplay: React.FC = () => {
  const metrics = useHealthCheck();
  const { text: statusOnline = 'System Operational' } =
    useTranslation('statusOnline');
  const { text: statusOffline = 'System Unavailable' } =
    useTranslation('statusOffline');
  const { text: statusNoConnection = 'No Connection' } =
    useTranslation('statusNoConnection');
  const { text: statusChecking = 'Checking Status...' } =
    useTranslation('statusChecking');

  const statusMessage = {
    ONLINE: 'Backend: Online',
    OFFLINE: `Backend: Offline ${metrics.failureCount > 0 ? `(Retry ${metrics.failureCount}/${MAX_RETRIES})` : ''}`,
    NO_CONNECTION: 'Backend: No Connection',
    CHECKING: `Backend: Checking${'.'.repeat((metrics.failureCount % 3) + 1)}`,
  }[metrics.status];

  return (
    <output
      className={STATUS_CLASSES[metrics.status]}
      aria-live="polite"
      title={`Last checked: ${new Date(metrics.lastCheckTime).toLocaleString()}`}
    >
      {statusMessage}
    </output>
  );
};
