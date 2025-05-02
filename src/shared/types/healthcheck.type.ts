export type HealthMetrics = {
  lastCheckTime: number;
  failureCount: number;
  averageResponseTime: number;
  responseTime: number;
  status: HealthStatus;
  isOnline: boolean;
};

export type HealthStatus = 'ONLINE' | 'OFFLINE' | 'NO_CONNECTION' | 'CHECKING';

export type PubSubHealthListener = (metrics: HealthMetrics) => void;
