import { ApiResponse, CacheRecord } from '@/shared/types/api.type';
import { cacheService } from './cacheService';

export function addConditionalCacheHeaders(
  headers: Headers | Record<string, string>,
  cachedRecord: CacheRecord<unknown> | undefined
): void {
  if (cachedRecord) {
    if (cachedRecord.etag) {
      if (headers instanceof Headers) {
        headers.set('If-None-Match', cachedRecord.etag);
      } else {
        headers['If-None-Match'] = cachedRecord.etag;
      }
    }
    if (cachedRecord.lastModified) {
      if (headers instanceof Headers) {
        headers.set('If-Modified-Since', cachedRecord.lastModified);
      } else {
        headers['If-Modified-Since'] = cachedRecord.lastModified;
      }
    }
  }
}

export function saveToCache<T>(
  cacheKey: string,
  data: ApiResponse<T>,
  response: Response
): void {
  cacheService.set(
    cacheKey,
    data,
    response.headers.get('ETag') ?? undefined,
    response.headers.get('Last-Modified') ?? undefined,
    data.cacheTTL ?? 60
  );
}

export function logCacheStatus(
  cacheKey: string,
  cachedRecord: CacheRecord<unknown> | undefined,
  response?: Response
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Cache ${cachedRecord ? 'HIT' : 'MISS'} for ${cacheKey}`);
    if (response?.status === 304) {
      console.log(`304 Not Modified: ${cacheKey}`);
    }
  }
}

export function createResourceUrl(path: string): string {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8001';
  return `${BACKEND_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
