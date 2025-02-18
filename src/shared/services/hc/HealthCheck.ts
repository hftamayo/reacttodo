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

export const HealthCheck = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const [status, setStatusInternal] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { text: statusOn } = useTranslation('statusOn');
  const { text: statusOff } = useTranslation('statusOff');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response: ApiResponse<HealthCheckData<AppHealthDetails>> =
          await beOps.appHealth();
        setStatusInternal(response.data.healthCheck.status);
        setStatus(response.data.healthCheck.status);
      } catch (err: unknown) {
        setStatusInternal('fail');
        setStatus('fail');
      }
    };

    const intervalId = setInterval(checkHealth, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [queryClient, setStatus]);

  useEffect(() => {
    if (status === 'fail') {
      toast.error(statusOff);
    } else if (status === 'pass') {
      toast.error(statusOn);
    }
  }, [status, statusOn, statusOff]);

  return null; // This component does not render anything itself
};
