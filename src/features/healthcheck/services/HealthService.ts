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
  private retryTimeout: NodeJS.Timeout | null = null;
  private readonly REQUEST_TIMEOUT = 5000;

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
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
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
    this.updateMetrics({ isOnline: true, status: 'CHECKING' });
    showSuccess('Backend Connection restored');
    this.retryCount = 0;
    this.checkHealth();
  };

  private readonly handleOffline = () => {
    this.updateMetrics({
      isOnline: false,
      status: 'NO_CONNECTION',
      failureCount: this.retryCount + 1,
    });
    showError('Network Error', 'Backend connection lost');
    this.scheduleRetry();
  };

  private readonly scheduleRetry = () => {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount += 1;
      if (this.retryTimeout) {
        clearTimeout(this.retryTimeout);
      }
      this.retryTimeout = setTimeout(() => {
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

  private handleCheckFailure(reason: string) {
    this.retryCount += 1;
    const isMaxRetries = this.retryCount >= MAX_RETRIES;

    this.updateMetrics({
      status: 'OFFLINE',
      failureCount: this.retryCount,
      isOnline: false,
    });
    if (this.retryCount === 1) {
      showError('BackEnd Error', reason);
    }
    if (!isMaxRetries) {
      this.scheduleRetry();
    }
  }

  private updateResponseTime(responseTime: number) {
    const { averageResponseTime, failureCount } = this.metrics;
    const newAverageResponseTime =
      failureCount === 0
        ? responseTime
        : (averageResponseTime * failureCount + responseTime) /
          (failureCount + 1);

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
    if (!navigator.onLine) {
      this.updateMetrics({
        status: 'NO_CONNECTION',
        isOnline: false,
      });
      return;
    }
    try {
      const startTime = performance.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, this.REQUEST_TIMEOUT);
      const response = await fetch('/api/health', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      clearTimeout(timeoutId);
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        this.retryCount = 0;
        this.updateResponseTime(responseTime);
        this.updateMetrics({
          status: 'ONLINE',
          responseTime,
          failureCount: 0,
          isOnline: true,
        });
      } else {
        this.handleCheckFailure('Backend service unavailable');
      }
    } catch (error) {
      if (error instanceof Error) {
        const isTimeout = error.name === 'AbortError';
        this.handleCheckFailure(
          isTimeout ? 'Backend request timeout' : 'Backend connection failed'
        );
      }
    }
  }

  public getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }
}

export const healthService = new HealthService();
