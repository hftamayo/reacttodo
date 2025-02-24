import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { beOps } from '../../api/apiClient';
import {
  ApiResponse,
  HealthCheckData,
  AppHealthDetails,
} from '@/shared/types/api.type';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import { setMetrics } from '../slices/healthMetricsSlice';
import { showApiError } from '@/shared/utils/error/errorUtils';
import {
  HEALTH_CHECK_INTERVAL,
  OFFLINE_CHECK_INTERVAL,
  MAX_RETRIES,
} from '@/shared/utils/envvars';

export const useHealthCheck = (setStatus: (status: string) => void) => {
  const dispatch = useDispatch();
  const [statusInternal, setStatusInternal] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [internalMetrics, setInternalMetrics] = useState<HealthMetrics>({
    lastCheckTime: Date.now(),
    failureCount: 0,
    averageResponseTime: 0,
    responseTime: 0,
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
        setStatus(status === 'pass' ? 'Online' : 'Offline');
      }

      // Update metrics
      const updatedMetrics = {
        lastCheckTime: Date.now(),
        failureCount: 0, // Reset on success
        averageResponseTime:
          (internalMetrics.averageResponseTime + responseTime) / 2,
        responseTime,
      };
      setInternalMetrics(updatedMetrics);
      dispatch(setMetrics(updatedMetrics));
      //reset retry count if successful
      setRetryCount(0);
      return true;
    } catch (err: unknown) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      setRetryCount((prev) => prev + 1);

      const updatedMetrics = {
        lastCheckTime: Date.now(),
        failureCount: internalMetrics.failureCount + 1,
        averageResponseTime: internalMetrics.averageResponseTime,
        responseTime,
      };
      setInternalMetrics(updatedMetrics);
      dispatch(setMetrics(updatedMetrics));

      // Only show error if retryCount has reached MAX_RETRIES
      if (retryCount >= MAX_RETRIES && statusInternal !== 'fail') {
        setStatusInternal('fail');
        setStatus('Offline');

        if (err instanceof Error) {
          showApiError(
            { httpStatusCode: 500, resultMessage: err.message },
            'Failed to perform health check. Please try again later.'
          );
        } else {
          showApiError(
            { httpStatusCode: 500, resultMessage: 'Unknown error' },
            'Failed to perform health check. Please try again later.'
          );
        }
      }

      return false;
    }
  }, [setStatus, statusInternal, retryCount, internalMetrics, dispatch]);

  // Run health check on initial mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Dynamic interval based on retry count
  useEffect(() => {
    const interval =
      retryCount > 0 ? OFFLINE_CHECK_INTERVAL : HEALTH_CHECK_INTERVAL;
    const intervalId = setInterval(checkHealth, interval);

    return () => clearInterval(intervalId);
  }, [checkHealth, retryCount]);

  return { statusInternal, checkHealth };
};
