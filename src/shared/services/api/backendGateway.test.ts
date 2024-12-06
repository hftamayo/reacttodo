import { beOps, taskOps } from './backendGateway';
import { ApiError, TaskProps, TaskResponse } from '@/shared/types/task.type';

global.fetch = jest.fn();

describe('beOps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check health successfully', async () => {
    const mockResponse = { status: 'ok' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await beOps.checkHealth();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/health`,
      {
        credentials: 'include',
      }
    );
  });

  it('should handle errors when checking health', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(beOps.checkHealth()).rejects.toThrow(
      'An unknown error occurred'
    );
  });
});

describe('taskOps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get tasks successfully', async () => {
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Data fetched successfully',
      tasks: [],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.getTasks();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/todos?limit=5&skip=10`,
      {
        //credentials: 'include',
      }
    );
  });

  it('should handle errors when getting tasks', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(taskOps.getTasks()).rejects.toThrow(
      'An unknown error occurred'
    );
  });

  // Add similar tests for getTask, addTask, updateTask, and deleteTask
});
