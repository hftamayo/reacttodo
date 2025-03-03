import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { HealthStatus } from '@/shared/types/healthcheck.type';

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
    ONLINE: statusOnline,
    OFFLINE: statusOffline,
    NO_CONNECTION: statusNoConnection,
    CHECKING: statusChecking,
  }[metrics.status];

  return (
    <output className={STATUS_CLASSES[metrics.status]} aria-live="polite">
      {statusMessage}
    </output>
  );
};
