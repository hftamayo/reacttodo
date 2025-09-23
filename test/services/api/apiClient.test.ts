/**
 * @jest-environment jsdom
 */

import { beOps, authOps, userOps, taskOps } from '../../../src/shared/services/api/apiClient';

// Mocks
jest.mock('../../../src/shared/services/api/apiHelpers', () => ({
  handleResponse: jest.fn(),
  handleError: jest.fn(),
  makeRequest: jest.fn(),
}));

jest.mock('../../../src/shared/utils/envvars', () => ({
  BACKEND_URL: 'http://example.com/api',
}));

import { handleResponse, handleError, makeRequest } from '../../../src/shared/services/api/apiHelpers';

// Global fetch mock
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // stable performance.now
    jest.spyOn(performance, 'now').mockReturnValue(123456.789);
  });

  describe('beOps', () => {
    it('appHealth - returns handled response and annotates startTime (AAA)', async () => {
      // Arrange
      const responseData = {
        code: 200,
        resultMessage: 'OK',
        data: {
          healthCheck: {
            details: { startTime: undefined },
          },
        },
      } as any;
      (handleResponse as jest.Mock).mockResolvedValue(responseData);
      mockFetch.mockResolvedValue({} as Response);

      // Act
      const result = await beOps.appHealth();

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('http://example.com/api/healthcheck/app', {});
      expect(handleResponse).toHaveBeenCalled();
      expect(result).toBe(responseData);
      expect(result.data.healthCheck.details!.startTime).toBe(123456.789);
    });

    it('appHealth - propagates error via handleError (AAA)', async () => {
      // Arrange
      const err = new Error('network down');
      mockFetch.mockRejectedValue(err);

      // Act & Assert
      await expect(beOps.appHealth()).rejects.toBe(err);
      expect(handleError).toHaveBeenCalledWith(err);
    });

    it('dbHealth - returns handled response (AAA)', async () => {
      // Arrange
      const responseData = { code: 200, data: { ok: true } } as any;
      (handleResponse as jest.Mock).mockResolvedValue(responseData);
      mockFetch.mockResolvedValue({} as Response);

      // Act
      const result = await beOps.dbHealth();

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('http://example.com/api/healthcheck/db', {});
      expect(handleResponse).toHaveBeenCalled();
      expect(result).toBe(responseData);
    });
  });

  describe('authOps', () => {
    it('login - posts credentials with include (AAA)', async () => {
      // Arrange
      const creds = { email: 'a@b.c', password: 'x' } as any;
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await authOps.login(creds);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(creds),
      });
      expect(result).toBe(mocked);
    });

    it('signup - posts user with include (AAA)', async () => {
      // Arrange
      const user = { email: 'x@y.z', password: 'p' } as any;
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await authOps.signup(user);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/users/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
      });
      expect(result).toBe(mocked);
    });

    it('logout - posts with include (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await authOps.logout();

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      expect(result).toBe(mocked);
    });
  });

  describe('userOps', () => {
    it('getCurrentUser - gets with include (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: { id: 1 } } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await userOps.getCurrentUser();

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/users/me', {
        method: 'GET',
        credentials: 'include',
      });
      expect(result).toBe(mocked);
    });
  });

  describe('taskOps', () => {
    it('getTasks - builds URL with pagination and timestamp (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: { tasks: [] } } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);
      const params = { page: 2, limit: 25, _t: 111 } as any;

      // Act
      const result = await taskOps.getTasks(params);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith(
        'http://example.com/api/todos/list/page?page=2&limit=25&_t=111'
      );
      expect(result).toBe(mocked);
    });

    it('getTask - gets a single task (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await taskOps.getTask(7);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/todos/task/7');
      expect(result).toBe(mocked);
    });

    it('addTask - posts body (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);
      const body = { title: 't' } as any;

      // Act
      const result = await taskOps.addTask(body);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/todos/create', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      expect(result).toBe(mocked);
    });

    it('updateTask - patches body (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);
      const body = { id: 9, title: 't' } as any;

      // Act
      const result = await taskOps.updateTask(body);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/todos/update/9', {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
      expect(result).toBe(mocked);
    });

    it('toggleTaskDone - patches no body (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await taskOps.toggleTaskDone(5);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/todos/task/5/done', {
        method: 'PATCH',
      });
      expect(result).toBe(mocked);
    });

    it('deleteTask - deletes (AAA)', async () => {
      // Arrange
      const mocked = { code: 200, data: {} } as any;
      (makeRequest as jest.Mock).mockResolvedValue(mocked);

      // Act
      const result = await taskOps.deleteTask(3);

      // Assert
      expect(makeRequest).toHaveBeenCalledWith('http://example.com/api/todos/delete/3', {
        method: 'DELETE',
      });
      expect(result).toBe(mocked);
    });
  });
});


