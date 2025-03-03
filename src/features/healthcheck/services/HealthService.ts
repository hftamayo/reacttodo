import {
  HealthStatus,
  HealthMetrics,
  PubSubHealthListener,
} from '@/shared/types/healthcheck.type';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';

class HealthService {
  private readonly listeners: Set<PubSubHealthListener> = new Set();
  private currentStatus: string = 'Checkign status...';

  subscribe(listener: PubSubHealthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentStatus);

    return () => {
      this.listeners.delete(listener);
    };
  }

  updateStatus(status: string) {
    this.currentStatus = status;
    this.listeners.forEach((listener) => listener(status));
  }

  getCurrentStatus(): string {
    return this.currentStatus;
  }
}

export const healthService = new HealthService();
class HealthService {
  private listeners: Set<PubSubHealthListener> = new Set();
  private metrics: HealthMetrics = {
    lastCheckTime: Date.now(),
    failureCount: 0,
    averageResponseTime: 0,
    responseTime: 0,
    status: 'CHECKING',
    isOnline: navigator.onLine,
  };

  private checkHealthDebounced: NodeJS.Timeout | null = null;

  constructor() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  private handleOnline = () => {
    this.updateMetrics({ isOnline: true });
    showSuccess('Connection restored');

    if (this.checkHealthDebounced) {
      clearTimeout(this.checkHealthDebounced);
    }
    this.checkHealthDebounced = setTimeout(() => this.checkHealth(), 500);
  };

  private handleOffline = () => {
    this.updateMetrics({
      isOnline: false,
      status: 'NO_CONNECTION',
    });
    showError('Network Error', 'Connection lost');
  };

  private updateMetrics(update: Partial<HealthMetrics>) {
    this.metrics = {
      ...this.metrics,
      ...update,
      lastCheckTime: Date.now(),
    };
    this.notifyListeners();
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

      if (response.ok) {
        this.updateMetrics({
          status: 'ONLINE',
          responseTime: endTime - startTime,
          failureCount: 0,
        });
      } else {
        this.updateMetrics({
          status: 'OFFLINE',
          failureCount: this.metrics.failureCount + 1,
        });
      }
    } catch (error) {
      this.updateMetrics({
        status: 'NO_CONNECTION',
        failureCount: this.metrics.failureCount + 1,
      });
    }
  }

  public getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }
}

export const healthService = new HealthService();
