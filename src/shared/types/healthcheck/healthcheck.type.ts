export type AppHealthDetails = {
  timestamp: string;
  uptime: number;
  memoryUsage: {
    total: number;
    free: number;
  };
  startTime: number;
};

export type DbHealthDetails = {
  timestamp: string;
  connectionTime?: number;
  databaseStatus?: string;
  error?: string;
};

export type HealthCheckProps<T> = {
  status: string;
  message: string;
  details?: T;
};

export type HealthCheckData<T> = {
  healthCheck: HealthCheckProps<T>;
};

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
