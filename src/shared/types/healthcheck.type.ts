export type HealthMetrics = {
  lastCheckTime: number;
  failureCount: number;
  averageResponseTime: number;
  responseTime: number;
};

export type PubSubListener = (status: string) => void;
