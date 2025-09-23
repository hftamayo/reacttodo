/**
 * @jest-environment jsdom
 */

import { 
  handleResponse, 
  handleError, 
  makeRequest,
  // Internal functions for testing (we'll need to export them or test indirectly)
} from '../../../src/shared/services/api/apiHelpers';
import { showError } from '../../../src/shared/services/notification/notificationService';
import { ApiError, ApiResponse } from '../../../src/shared/types/api.type';

// Mock the notification service
jest.mock('../../../src/shared/services/notification/notificationService', () => ({
  showError: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock console methods to avoid noise in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('apiHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleLog.mockClear();
  });

  describe('handleResponse', () => {
    it('should return parsed JSON data when response is ok', async () => {
      // Arrange
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      } as unknown as Response;

      // Act
      const result = await handleResponse(mockResponse);

      // Assert
      expect(result).toEqual(mockData);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it('should throw ApiError when response is not ok', async () => {
      // Arrange
      const errorData = { message: 'Not found' };
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: jest.fn().mockResolvedValue(errorData),
      } as unknown as Response;

      // Act & Assert
      await expect(handleResponse(mockResponse)).rejects.toMatchObject({
        code: 404,
        resultMessage: expect.stringContaining('Network response was not ok'),
      });
    });

    it('should handle response with empty error data', async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValue({}),
      } as unknown as Response;

      // Act & Assert
      await expect(handleResponse(mockResponse)).rejects.toMatchObject({
        code: 500,
        resultMessage: expect.stringContaining('Internal Server Error'),
      });
    });
  });

  describe('handleError', () => {
    it('should call showError with Error instance and rethrow', () => {
      // Arrange
      const error = new Error('Test error message');
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      expect(() => handleError(error)).toThrow('Test error message');
      expect(showErrorMock).toHaveBeenCalledWith(
        { code: 500, resultMessage: 'Test error message' },
        'An error occurred while processing your request.'
      );
    });

    it('should call showError with ApiError and rethrow', () => {
      // Arrange
      const apiError: ApiError = {
        code: 400,
        resultMessage: 'Bad Request',
      };
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      expect(() => handleError(apiError)).toThrow();
      expect(showErrorMock).toHaveBeenCalledWith(
        apiError,
        'An error occurred while processing your request.'
      );
    });

    it('should handle unknown error types', () => {
      // Arrange
      const unknownError = 'String error';
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      expect(() => handleError(unknownError)).toThrow();
      expect(showErrorMock).toHaveBeenCalledWith(
        unknownError,
        'An error occurred while processing your request.'
      );
    });
  });

  describe('makeRequest', () => {
    beforeEach(() => {
      // Mock AbortController
      global.AbortController = jest.fn().mockImplementation(() => ({
        abort: jest.fn(),
        signal: {},
      })) as any;
    });

    it('should make successful request and return data', async () => {
      // Arrange
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await makeRequest<typeof mockData>('https://api.test.com/data');

      // Assert
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/data',
        expect.objectContaining({
          headers: expect.any(Headers),
          mode: 'cors',
          signal: expect.any(Object),
        })
      );
    });

    it('should handle POST request with body', async () => {
      // Arrange
      const mockData = { success: true };
      const requestBody = { name: 'Test' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await makeRequest<typeof mockData>(
        'https://api.test.com/data',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      );

      // Assert
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/data',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: expect.any(Headers),
        })
      );
    });

    it('should handle rate limit response (429)', async () => {
      // Arrange
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        json: jest.fn().mockResolvedValue({}),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await makeRequest<typeof mockData>('https://api.test.com/data?page=1');

      // Assert
      expect(result).toEqual({
        code: 200,
        resultMessage: 'CACHED_RESPONSE',
        data: { tasks: [] },
        timestamp: expect.any(Number),
        cacheTTL: 60,
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Rate limit exceeded for https://api.test.com/data?page=1, using cached data if available'
      );
    });

    it('should handle error response (500)', async () => {
      // Arrange
      const errorData = { message: 'Internal Server Error' };
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValue(errorData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data')).rejects.toMatchObject({
        code: 500,
        resultMessage: expect.stringContaining('Internal Server Error'),
      });
      expect(showErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 500,
          resultMessage: expect.stringContaining('Internal Server Error'),
        }),
        'Request failed'
      );
    });

    it('should handle network timeout (AbortError)', async () => {
      // Arrange
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      mockFetch.mockRejectedValue(abortError);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data')).rejects.toMatchObject({
        code: 408,
        resultMessage: 'Request timed out',
      });
      expect(showErrorMock).toHaveBeenCalledWith(
        { code: 408, resultMessage: 'Request timed out' },
        'Network timeout'
      );
    });

    it('should handle network error without code', async () => {
      // Arrange
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data')).rejects.toMatchObject({
        code: 500,
        resultMessage: 'Network error',
      });
      expect(showErrorMock).toHaveBeenCalledWith(
        { code: 500, resultMessage: 'Network error' },
        'Network error occurred'
      );
    });

    it('should handle rate limit exception with cached data', async () => {
      // Arrange
      const rateLimitError = { code: 429 };
      mockFetch.mockRejectedValue(rateLimitError);

      // Act & Assert
      const result = await makeRequest('https://api.test.com/data?page=1');
      expect(result).toEqual({
        code: 200,
        resultMessage: 'CACHED_RESPONSE',
        data: { tasks: [] },
        timestamp: expect.any(Number),
        cacheTTL: 60,
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Rate limit exception caught, checking cache...'
      );
    });

    it('should suppress error notification for prefetch requests', async () => {
      // Arrange
      const error = { code: 500, resultMessage: 'Server error' };
      mockFetch.mockRejectedValue(error);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data?page=1&_t=123')).rejects.toMatchObject({
        code: 500,
        resultMessage: 'Server error',
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'Suppressing error notification for prefetch request:',
        'Server error'
      );
    });

    it('should build headers correctly', async () => {
      // Arrange
      const mockData = { success: true };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      await makeRequest('https://api.test.com/data', {
        headers: { 'Custom-Header': 'test-value' },
      });

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/data',
        expect.objectContaining({
          headers: expect.any(Headers),
        })
      );

      // Verify headers were set correctly
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as Headers;
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('Accept')).toBe('application/json');
      expect(headers.get('Custom-Header')).toBe('test-value');
    });

    it('should handle request with custom error context', async () => {
      // Arrange
      const errorData = { message: 'Bad Request' };
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: jest.fn().mockResolvedValue(errorData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data', {}, 'Custom context')).rejects.toMatchObject({
        code: 400,
        resultMessage: expect.stringContaining('Bad Request'),
      });
      expect(showErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 400,
          resultMessage: expect.stringContaining('Bad Request'),
        }),
        'Custom context'
      );
    });
  });

  describe('caching behavior', () => {
    it('should cache successful responses', async () => {
      // Arrange
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act - Make first request
      const result1 = await makeRequest<typeof mockData>('https://api.test.com/data');
      
      // Make second request (should use cache)
      const result2 = await makeRequest<typeof mockData>('https://api.test.com/data');

      // Assert
      expect(result1).toEqual(mockData);
      expect(result2).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(2); // Still makes the request, but caches the result
    });
  });

  describe('edge cases', () => {
    it('should handle response with invalid JSON', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data')).rejects.toMatchObject({
        code: 500,
        resultMessage: 'Invalid JSON',
      });
    });

    it('should handle error response with invalid JSON', async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);
      const showErrorMock = showError as jest.MockedFunction<typeof showError>;

      // Act & Assert
      await expect(makeRequest('https://api.test.com/data')).rejects.toMatchObject({
        code: 500,
        resultMessage: expect.stringContaining('Internal Server Error'),
      });
      expect(showErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 500,
          resultMessage: expect.stringContaining('Internal Server Error'),
        }),
        'Request failed'
      );
    });
  });
});
