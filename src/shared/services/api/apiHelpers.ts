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

function buildHeaders(headers: HeadersInit = {}): Headers {
  const result = new Headers(headers);
  result.set('Content-Type', 'application/json');
  result.set('Accept', 'application/json');
  return result;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  headers: Headers
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function isRateLimit(response: Response) {
  return response.status === 429;
}

function isPrefetch(url: string) {
  return url.includes('_t=') || url.includes('page=');
}

function buildEmptyPrefetchResponse<T>(): ApiResponse<T> {
  return {
    code: 200,
    resultMessage: 'CACHED_RESPONSE',
    data: { tasks: [] } as any,
    timestamp: Date.now(),
    cacheTTL: 60,
  };
}

async function handleOkResponse<T>(
  url: string,
  response: Response
): Promise<ApiResponse<T>> {
  const data = await response.json();
  setCachedData(url, data);
  return data;
}

async function handleRateLimit<T>(
  url: string,
  response: Response
): Promise<ApiResponse<T>> {
  console.warn(
    `Rate limit exceeded for ${url}, using cached data if available`
  );
  const cachedData = getCachedData(url);
  if (cachedData) {
    console.log('Returning cached data');
    return cachedData;
  }
  if (isPrefetch(url)) {
    console.log('Prefetch request rate limited, returning empty result');
    return buildEmptyPrefetchResponse<T>();
  }
  // If not prefetch and no cache, throw error
  const errorData = await response.json().catch(() => ({}));
  const error: ApiError = {
    code: response.status,
    resultMessage: `Request failed: ${response.statusText}. ${JSON.stringify(errorData)}`,
  };
  throw error;
}

async function handleErrorResponse<T>(
  response: Response,
  errorContext?: string
): Promise<ApiResponse<T>> {
  const errorData = await response.json().catch(() => ({}));
  const error: ApiError = {
    code: response.status,
    resultMessage: `Request failed: ${response.statusText}. ${JSON.stringify(errorData)}`,
  };
  showError(error, errorContext ?? 'Request failed');
  throw error;
}

function handleRateLimitException<T>(
  error: unknown,
  url: string
): ApiResponse<T> | undefined {
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
    if (isPrefetch(url)) {
      console.log('Prefetch request rate limited in exception handler');
      return buildEmptyPrefetchResponse<T>();
    }
  }
  return undefined;
}

function handleAbortException(
  error: unknown,
  errorContext?: string
): never | undefined {
  if (error instanceof DOMException && error.name === 'AbortError') {
    const timeoutError: ApiError = {
      code: 408,
      resultMessage: 'Request timed out',
    };
    showError(timeoutError, errorContext ?? 'Network timeout');
    throw timeoutError;
  }
  return undefined;
}

function handleNetworkException(
  error: unknown,
  errorContext?: string
): never | undefined {
  if (!(error as ApiError).code) {
    const networkError: ApiError = {
      code: 500,
      resultMessage: error instanceof Error ? error.message : String(error),
    };
    showError(networkError, errorContext ?? 'Network error occurred');
    throw networkError;
  }
  return undefined;
}

async function handleRequestException<T>(
  error: unknown,
  url: string,
  errorContext?: string
): Promise<ApiResponse<T>> {
  const rateLimitResult = handleRateLimitException<T>(error, url);
  if (rateLimitResult !== undefined) {
    return rateLimitResult;
  }

  handleAbortException(error, errorContext);
  handleNetworkException(error, errorContext);

  if (!isPrefetch(url)) {
    showError(error as ApiError, errorContext ?? 'Request failed');
  } else {
    console.warn(
      'Suppressing error notification for prefetch request:',
      (error as ApiError).resultMessage
    );
  }
  throw error;
}

export const makeRequest = async <T>(
  url: string,
  options: RequestInit = {},
  errorContext?: string
): Promise<ApiResponse<T>> => {
  try {
    const headers = buildHeaders(options.headers);
    const response = await fetchWithTimeout(url, options, headers);
    if (response.ok) {
      return await handleOkResponse<T>(url, response);
    }
    if (isRateLimit(response)) {
      return await handleRateLimit<T>(url, response);
    }
    return await handleErrorResponse<T>(response, errorContext);
  } catch (error) {
    return await handleRequestException<T>(error, url, errorContext);
  }
};
