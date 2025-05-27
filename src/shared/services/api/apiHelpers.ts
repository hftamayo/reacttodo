import { showError } from '../notification/notificationService';
import { cacheService } from './cacheService';

import {
  ApiError,
  ApiResponse,
} from '../../types/api.type';

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: ApiError = {
      code: response.status,
      resultMessage: `Network response was not ok: ${response.statusText}. Data: ${JSON.stringify(errorData)}`,
    };
    throw error;
  }
  return await response.json();
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    showError(
      { code: 500, resultMessage: error.message },
      'An error occurred while processing your request.'
    );
  } else {
    showError(
      error as ApiError,
      'An error occurred while processing your request.'
    );
  }
  throw error;
};

const makeRequest = async <T>(
  url: string,
  options: RequestInit = {},
  cacheOptions = { useCache: true, invalidateCache: false }
): Promise<ApiResponse<T>> => {
  try {
    // "Request interceptor" logic
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const cacheKey = url;
    const cachedRecord = cacheOptions.useCache
      ? cacheService.get(cacheKey)
      : null;

    if (cacheOptions.invalidateCache) {
      cacheService.invalidateCache(BACKEND_URL);
    }

    // Add cache headers if we have a cached record
    if (
      cachedRecord &&
      cacheService.isValid(cacheKey) &&
      options.method === 'GET'
    ) {
      addConditionalCacheHeaders(headers, cachedRecord);

      // Return from cache if valid
      if (cacheOptions.useCache) {
        logCacheStatus(cacheKey, cachedRecord);
        return cachedRecord.data as ApiResponse<T>;
      }
    }

    // Make the request with the modified headers
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
    });

    // Handle 304 Not Modified
    if (response.status === 304 && cachedRecord) {
      cacheService.updateTimestamp(cacheKey);
      logCacheStatus(cacheKey, cachedRecord, response);
      return cachedRecord.data as ApiResponse<T>;
    }

    // "Response interceptor" logic
    if (response.ok) {
      const responseClone = response.clone();
      const data = await handleResponse<T>(response);

      // Save to cache for GET requests
      if (options.method === 'GET' || !options.method) {
        saveToCache(cacheKey, data, responseClone);
        logCacheStatus(cacheKey, cachedRecord, response);
      }

      return data;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

  invalidateCache: (taskId?: number) =>
    cacheService.invalidateCache(BACKEND_URL, taskId),
};