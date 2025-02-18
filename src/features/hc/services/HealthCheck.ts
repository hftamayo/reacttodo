import React, { useEffect, useState } from 'react';
import { beOps } from '../../../shared/services/api/apiClient';
import {
  ApiResponse,
  HealthCheckData,
  AppHealthDetails,
} from '@/shared/types/api.type';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response: ApiResponse<HealthCheckData<AppHealthDetails>> =
          await beOps.appHealth();
        setStatus(response.data.healthCheck.status);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          setStatus('fail');
        } else {
          setError(String(err));
          setStatus('fail');
        }
      }
    };

    const intervalId = setInterval(checkHealth, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [queryClient]);

  useEffect(() => {
    if (status === 'fail') {
      toast.error('Connection lost');
    } else if (status === 'pass') {
      toast.success('Connection restored');
    }
  }, [status]);

  return null; // This component does not render anything itself
};
