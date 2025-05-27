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
      return await response.json();
    }

    // Handle error
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      code: response.status,
      resultMessage: `Request failed: ${response.statusText}. ${JSON.stringify(errorData)}`,
    };
    throw error;
  } catch (error: unknown) {
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
      showError(error as ApiError, errorContext ?? 'Request failed');
      throw error;
    }
  }
};
