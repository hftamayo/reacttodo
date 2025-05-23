import { CacheRecord } from '@/shared/types/api.type';

// In-memory cache
const cache = new Map<string, CacheRecord>();

export const cacheService = {
  /**
   * Gets a value from cache
   */
  get<T>(cacheKey: string): CacheRecord | undefined {
    return cache.get(cacheKey);
  },

  /**
   * Sets a value in cache
   */
  set(
    cacheKey: string,
    data: any,
    etag?: string,
    lastModified?: string,
    ttl: number = 60
  ): void {
    cache.set(cacheKey, {
      etag,
      lastModified,
      data,
      timestamp: Date.now(),
      ttl,
    });
  },

  /**
   * Updates an existing cache record's timestamp
   */
  updateTimestamp(cacheKey: string): void {
    const record = cache.get(cacheKey);
    if (record) {
      cache.set(cacheKey, {
        ...record,
        timestamp: Date.now(),
      });
    }
  },

  /**
   * Checks if cache is still valid based on TTL
   */
  isValid(cacheKey: string): boolean {
    const record = cache.get(cacheKey);
    if (!record) return false;

    const now = Date.now();
    return record.timestamp + record.ttl * 1000 > now;
  },

  /**
   * Invalidates cache for a specific task or all tasks
   */
  invalidateCache(baseUrl: string, taskId?: number): void {
    if (taskId) {
      // Invalidate specific task
      cache.delete(`${baseUrl}/tasks/task/${taskId}`);
    }

    // Invalidate all task lists
    for (const key of cache.keys()) {
      if (key.includes('task/list')) {
        cache.delete(key);
      }
    }

    // Log cache invalidation in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Cache invalidated:',
        taskId ? `Task ID: ${taskId}` : 'All task lists'
      );
      console.log('Remaining cache entries:', cache.size);
    }
  },

  /**
   * Get statistics about the cache
   */
  getStats(): {
    size: number;
    keys: string[];
    totalCacheSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    const entries = Array.from(cache.values());
    return {
      size: cache.size,
      keys: Array.from(cache.keys()),
      totalCacheSize: entries.reduce((total, item) => {
        return total + JSON.stringify(item.data).length;
      }, 0),
      oldestEntry: entries.length
        ? Math.min(...entries.map((item) => item.timestamp))
        : null,
      newestEntry: entries.length
        ? Math.max(...entries.map((item) => item.timestamp))
        : null,
    };
  },

  /**
   * Clear the entire cache
   */
  clear(): void {
    cache.clear();
    if (process.env.NODE_ENV === 'development') {
      console.log('Cache cleared');
    }
  },
};
