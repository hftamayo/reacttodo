/**
 * Test utilities for API helpers testing
 */

import { ApiError, ApiResponse } from '../../src/shared/types/api.type';

/**
 * Creates a mock Response object for testing
 */
export const createMockResponse = (
  ok: boolean,
  status: number,
  statusText: string,
  data?: any
): Response => {
  return {
    ok,
    status,
    statusText,
    json: jest.fn().mockResolvedValue(data || {}),
  } as unknown as Response;
};

/**
 * Creates a mock successful Response
 */
export const createMockSuccessResponse = (data: any): Response => {
  return createMockResponse(true, 200, 'OK', data);
};

/**
 * Creates a mock error Response
 */
export const createMockErrorResponse = (
  status: number,
  statusText: string,
  errorData?: any
): Response => {
  return createMockResponse(false, status, statusText, errorData);
};

/**
 * Creates a mock ApiError
 */
export const createMockApiError = (
  code: number,
  resultMessage: string
): ApiError => ({
  code,
  resultMessage,
});

/**
 * Creates a mock ApiResponse
 */
export const createMockApiResponse = <T>(
  data: T,
  code: number = 200,
  resultMessage: string = 'Success'
): ApiResponse<T> => ({
  code,
  resultMessage,
  data,
  timestamp: Date.now(),
  cacheTTL: 60,
});

/**
 * Mocks fetch with a successful response
 */
export const mockFetchSuccess = (data: any) => {
  const mockResponse = createMockSuccessResponse(data);
  (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
  return mockResponse;
};

/**
 * Mocks fetch with an error response
 */
export const mockFetchError = (status: number, statusText: string, errorData?: any) => {
  const mockResponse = createMockErrorResponse(status, statusText, errorData);
  (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
  return mockResponse;
};

/**
 * Mocks fetch with a network error
 */
export const mockFetchNetworkError = (error: Error) => {
  (global.fetch as jest.Mock).mockRejectedValue(error);
};

/**
 * Resets all mocks
 */
export const resetAllMocks = () => {
  jest.clearAllMocks();
  (global.fetch as jest.Mock).mockClear();
  jest.spyOn(console, 'error').mockClear();
  jest.spyOn(console, 'warn').mockClear();
  jest.spyOn(console, 'log').mockClear();
};
