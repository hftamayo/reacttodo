import { showError } from '../notification/notificationService';
import { ApiError, ApiResponse } from '../../types/api.type';

export const handleResponse = async <T>(
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

export const handleError = (error: unknown) => {
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

//functions related to caching
const cachedResponses = new Map<string, { data: any; timestamp: number }>();

const getCachedData = (url: string) => {
  const cached = cachedResponses.get(url);
  if (cached && Date.now() - cached.timestamp < 60000) {
    // 1 minute cache
    return cached.data;
  }
  return null;
};

const setCachedData = (url: string, data: any) => {
  cachedResponses.set(url, { data, timestamp: Date.now() });
};

export const makeRequest = async <T>(
  url: string,
  options: RequestInit = {},
  errorContext?: string
): Promise<ApiResponse<T>> => {
  try {
    // Set up standard headers
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Make the request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle response
    if (response.ok) {
      const data = await response.json();
      setCachedData(url, data);
      return data;
    }

    if (response.status === 429) {
      console.warn(
        `Rate limit exceeded for ${url}, using cached data if available`
      );

      // Check for cached data
      const cachedData = getCachedData(url);
      if (cachedData) {
        console.log('Returning cached data');
        return cachedData;
      }

      // Determine if this is a prefetch request (typically these have _t parameter)
      const isPrefetch = url.includes('_t=') || url.includes('page=');

      // For prefetch requests, don't show errors to users
      if (isPrefetch) {
        console.log('Prefetch request rate limited, returning empty result');
        return {
          code: 200,
          resultMessage: 'CACHED_RESPONSE',
          data: { tasks: [] } as any,
          timestamp: Date.now(),
          cacheTTL: 60,
        };
      }
    }

    // Handle error
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      code: response.status,
      resultMessage: `Request failed: ${response.statusText}. ${JSON.stringify(errorData)}`,
    };
    throw error;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      ((error as ApiError).code === 429 ||
        ('status' in error && (error as { status?: number }).status === 429))
    ) {
      console.warn('Rate limit exception caught, checking cache...');

      const cachedData = getCachedData(url);
      if (cachedData) {
        console.log('Returning cached data from exception handler');
        return cachedData;
      }

      // Is this a prefetch request?
      const isPrefetch = url.includes('_t=') || url.includes('page=');
      if (isPrefetch) {
        console.log('Prefetch request rate limited in exception handler');
        return {
          code: 200,
          resultMessage: 'EMPTY_RESPONSE_DUE_TO_RATE_LIMIT',
          data: { tasks: [] } as any,
          timestamp: Date.now(),
          cacheTTL: 60,
        };
      }
    }
    // Handle aborted requests
    if (error instanceof DOMException && error.name === 'AbortError') {
      const timeoutError: ApiError = {
        code: 408,
        resultMessage: 'Request timed out',
      };
      showError(timeoutError, errorContext ?? 'Network timeout');
      throw timeoutError;
    }

    // Handle network errors and other exceptions
    if (!(error as ApiError).code) {
      const networkError: ApiError = {
        code: 500,
        resultMessage: error instanceof Error ? error.message : String(error),
      };
      showError(networkError, errorContext ?? 'Network error occurred');
      throw networkError;
    } else {
      if (!url.includes('_t=') && !url.includes('page=')) {
        showError(error as ApiError, errorContext ?? 'Request failed');
      } else {
        console.warn(
          'Suppressing error notification for prefetch request:',
          (error as ApiError).resultMessage
        );
      }
      throw error;
    }
  }
};
