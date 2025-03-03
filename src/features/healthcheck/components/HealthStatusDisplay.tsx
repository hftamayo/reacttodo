import React, { useEffect, useState } from 'react';
import { healthStatusService } from '../services/HealthStatusService';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';

export const HealthStatusDisplay: React.FC = () => {
  const [status, setStatus] = useState(healthStatusService.getCurrentStatus());

  useEffect(() => {
    const unsubscribe = healthStatusService.subscribe(setStatus);

    return () => {
      unsubscribe();
    };
  }, []);

  const statusClass =
    status === 'Online'
      ? DashBoardFooterStyles.footer_text
      : DashBoardFooterStyles.footer_text_offline;

  return <span className={statusClass}>{status}</span>;
};
