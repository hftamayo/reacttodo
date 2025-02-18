import React, { useEffect, useState } from 'react';
import { beOps } from '../api/apiClient';
import {
  ApiResponse,
  HealthCheckData,
  AppHealthDetails,
} from '@/shared/types/api.type';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const HealthCheck = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const [statusInternal, setStatusInternal] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { text: statusOn = 'Status On' } = useTranslation('statusOn');
  const { text: statusOff = 'Status Off' } = useTranslation('statusOff');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response: ApiResponse<HealthCheckData<AppHealthDetails>> =
          await beOps.appHealth();
        const status = response.data.healthCheck.status;
        setStatusInternal(status);
        setStatus(status === 'pass' ? statusOn : statusOff);
      } catch (err: unknown) {
        setStatusInternal('fail');
        setStatus(statusOff);
      }
    };

    const intervalId = setInterval(checkHealth, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [queryClient, setStatus, statusOn, statusOff]);

  useEffect(() => {
    if (statusInternal === 'fail') {
      toast.error(`The application is: ${statusOff}`, {
        className: toasterMessages.errorToaster,
      });
    } else if (statusInternal === 'pass') {
      toast.success(`The application is: ${statusOn}`, {
        className: toasterMessages.successToaster,
      });
    }
  }, [statusInternal, statusOn, statusOff]);

  return null; // This component does not render anything itself
};
