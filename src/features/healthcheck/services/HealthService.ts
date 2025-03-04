import {
  HealthMetrics,
  PubSubHealthListener,
} from '@/shared/types/healthcheck.type';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import {
  HEALTH_CHECK_INTERVAL,
  OFFLINE_CHECK_INTERVAL,
  MAX_RETRIES,
} from '@/shared/utils/envvars';

class HealthService {
  private readonly listeners: Set<PubSubHealthListener> = new Set();
  private retryCount = 0;
  private checkHealthInterval: NodeJS.Timeout | null = null;

  private metrics: HealthMetrics = {
    lastCheckTime: Date.now(),
    failureCount: 0,
    averageResponseTime: 0,
    responseTime: 0,
    status: 'CHECKING',
    isOnline: navigator.onLine,
  };

  constructor() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
    this.startHealthCheck();
  }

  public cleanup(): void {
    if (this.checkHealthInterval) {
      clearInterval(this.checkHealthInterval);
    }
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  private readonly startHealthCheck = () => {
    this.checkHealth();
    this.checkHealthInterval = setInterval(() => {
      this.checkHealth();
    }, HEALTH_CHECK_INTERVAL);
  };

  private readonly handleOnline = () => {
    this.updateMetrics({ isOnline: true });
    showSuccess('Connection restored');
    this.retryCount = 0;
    this.checkHealth();
  };

  private readonly handleOffline = () => {
    this.updateMetrics({
      isOnline: false,
      status: 'NO_CONNECTION',
    });
    showError('Network Error', 'Connection lost');
    this.scheduleRetry();
  };

  private readonly scheduleRetry = () => {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount += 1;
      setTimeout(() => {
        this.checkHealth();
      }, OFFLINE_CHECK_INTERVAL);
    }
  };

  private updateMetrics(update: Partial<HealthMetrics>) {
    this.metrics = {
      ...this.metrics,
      ...update,
      lastCheckTime: Date.now(),
    };
    this.notifyListeners();
  }

  private handleCheckFailure() {
    this.updateMetrics({
      status: this.metrics.isOnline ? 'OFFLINE' : 'NO_CONNECTION',
      failureCount: this.retryCount + 1,
    });
    this.scheduleRetry();
  }

  private updateResponseTime(responseTime: number) {
    const { averageResponseTime } = this.metrics;
    const { failureCount } = this.metrics;
    const newAverageResponseTime =
      (averageResponseTime * failureCount + responseTime) / (failureCount + 1);

    this.updateMetrics({
      averageResponseTime: newAverageResponseTime,
    });
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.metrics));
  }

  public subscribe(listener: PubSubHealthListener): () => void {
    this.listeners.add(listener);
    listener(this.metrics);
    return () => this.listeners.delete(listener);
  }

  public async checkHealth(): Promise<void> {
    try {
      const startTime = performance.now();
      const response = await fetch('/api/health');
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        this.retryCount = 0;
        this.updateResponseTime(responseTime);
        this.updateMetrics({
          status: 'ONLINE',
          responseTime,
          failureCount: 0,
        });
      } else {
        this.handleCheckFailure();
      }
    } catch (error) {
      this.handleCheckFailure();
    }
  }

  public getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }
}

export const healthService = new HealthService();
