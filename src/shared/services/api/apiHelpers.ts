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
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    // Set up standard headers
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
    });

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
    // Handle network errors and other exceptions
    if (!(error as ApiError).code) {
      showError(
        {
          code: 500,
          resultMessage: error instanceof Error ? error.message : String(error),
        },
        'Network error occurred'
      );
    } else {
      showError(error as ApiError, 'Request failed');
    }
    throw error;
  }
};
