import { PubSubListener } from '@/shared/types/healthcheck.type';

class HealthStatusService {
  private readonly listeners: Set<PubSubListener> = new Set();
  private currentStatus: string = 'Checkign status...';

  subscribe(listener: PubSubListener): () => void {
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

export const healthStatusService = new HealthStatusService();
