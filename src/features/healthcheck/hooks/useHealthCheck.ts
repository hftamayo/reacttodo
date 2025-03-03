import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { beOps } from '../../../shared/services/api/apiClient';
import {
  ApiResponse,
  HealthCheckData,
  AppHealthDetails,
} from '@/shared/types/api.type';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import { setMetrics } from '../store/healthMetricsSlice';
import { showError } from '../../../shared/services/notification/notificationService';
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
  // Fix 1: Add a flag to track if check is running
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const checkHealth = useCallback(async () => {
    // Prevent concurrent calls
    if (isChecking) return false;

    setIsChecking(true);
    const startTime = performance.now();
    try {
      const response: ApiResponse<HealthCheckData<AppHealthDetails>> =
        await beOps.appHealth();
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      const status = response.data.healthCheck.status;

      // Fix 3: Pass the actual translated strings to the parent
      if (status !== statusInternal) {
        setStatusInternal(status);
        // Pass the actual translation strings here
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
      setIsChecking(false);
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

        // Only show the API error once
        if (internalMetrics.failureCount === 0) {
          if (err instanceof Error) {
            showError(
              { httpStatusCode: 500, resultMessage: err.message },
              'Failed to perform health check. Please try again later.'
            );
          } else {
            showError(
              { httpStatusCode: 500, resultMessage: 'Unknown error' },
              'Failed to perform health check. Please try again later.'
            );
          }
        }
      }

      setIsChecking(false);
      return false;
    }
  }, [
    setStatus,
    statusInternal,
    retryCount,
    internalMetrics,
    dispatch,
    isChecking,
  ]);

  // Run health check on initial mount
  useEffect(() => {
    checkHealth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove checkHealth from deps array to prevent initial loop

  // Dynamic interval based on retry count
  useEffect(() => {
    if (retryCount >= MAX_RETRIES) {
      // Stop polling when max retries reached
      return () => {};
    }

    const interval =
      retryCount > 0 ? OFFLINE_CHECK_INTERVAL : HEALTH_CHECK_INTERVAL;
    const intervalId = setInterval(checkHealth, interval);

    return () => clearInterval(intervalId);
  }, [checkHealth, retryCount]);

  return { statusInternal, checkHealth };
};
