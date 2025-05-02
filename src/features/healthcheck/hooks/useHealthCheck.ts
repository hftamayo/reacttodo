import { useState, useEffect } from 'react';
import { HealthMetrics } from '@/shared/types/healthcheck.type';
import { healthService } from '../services/HealthService';

export const useHealthCheck = () => {
  const [metrics, setMetrics] = useState<HealthMetrics>(
    healthService.getMetrics()
  );

  useEffect(() => {
    return healthService.subscribe(setMetrics);
  }, []);

  return metrics;
};
