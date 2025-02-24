import React, { useEffect, useState, useCallback } from 'react';
import { beOps } from '../api/apiClient';
import {
  ApiResponse,
  HealthCheckData,
  AppHealthDetails,
} from '@/shared/types/api.type';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import {
  HEALTH_CHECK_INTERVAL,
  OFFLINE_CHECK_INTERVAL,
  MAX_RETRIES,
} from '@/shared/utils/envvars';
import { toast } from 'sonner';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { toasterMessages } from '@/shared/utils/twind/styles';

export const HealthCheck = ({
  setStatus,
  setMetrics,
}: {
  setStatus: (status: string) => void;
  setMetrics: (metrics: HealthMetrics) => void;
}) => {
  const [statusInternal, setStatusInternal] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { text: statusOn = 'Online' } = useTranslation('statusOn'); // Changed to match expected value
  const { text: statusOff = 'Offline' } = useTranslation('statusOff'); // Changed to match expected value
  const [internalMetrics, setInternalMetrics] = useState<HealthMetrics>({
    lastCheckTime: Date.now(),
    failureCount: 0,
    averageResponseTime: 0,
  });

  const checkHealth = useCallback(async () => {
    const startTime = performance.now();
    try {
      const response: ApiResponse<HealthCheckData<AppHealthDetails>> =
        await beOps.appHealth();
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      const status = response.data.healthCheck.status;

      if (status !== statusInternal) {
        setStatusInternal(status);
        setStatus(status === 'pass' ? statusOn : statusOff);
      }

      // Update metrics
      const updatedMetrics = {
        lastCheckTime: Date.now(),
        failureCount: 0, // Reset on success
        averageResponseTime:
          (internalMetrics.averageResponseTime + responseTime) / 2,
      };
      setInternalMetrics(updatedMetrics);
      setMetrics(updatedMetrics);
      //reset retry count if successful
      setRetryCount(0);
      return true;
    } catch (err: unknown) {
      const endTime = performance.now();
      setRetryCount((prev) => prev + 1);

      const updatedMetrics = {
        lastCheckTime: Date.now(),
        failureCount: internalMetrics.failureCount + 1,
        averageResponseTime: internalMetrics.averageResponseTime,
      };
      setInternalMetrics(updatedMetrics);
      setMetrics(updatedMetrics);

      if (retryCount >= MAX_RETRIES && statusInternal !== 'fail') {
        setStatusInternal('fail');
        setStatus(statusOff);
      }
      return false;
    }
  }, [setStatus, statusOn, statusOff, statusInternal, retryCount]);

  // Run health check on initial mount
  useEffect(() => {
    checkHealth();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored', {
        className: toasterMessages.successToaster,
      });
      checkHealth(); // Immediate check when coming back online
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Connection lost', {
        className: toasterMessages.errorToaster,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkHealth]);

  // Dynamic interval based on online status and retry count
  useEffect(() => {
    if (!isOnline || retryCount >= MAX_RETRIES) {
      return; // Don't run health checks when offline or max retries reached
    }

    const interval =
      retryCount > 0 ? OFFLINE_CHECK_INTERVAL : HEALTH_CHECK_INTERVAL;
    const intervalId = setInterval(checkHealth, interval);

    return () => clearInterval(intervalId);
  }, [checkHealth, isOnline, retryCount]);

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

  return null;
};
