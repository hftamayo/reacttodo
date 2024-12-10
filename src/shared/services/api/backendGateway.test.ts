jest.mock('../../utils/envvars', () => require('../../utils/envvars.mock'));
import { beOps, taskOps } from './backendGateway';
import { ApiError, TaskProps, TaskResponse } from '@/shared/types/task.type';

global.fetch = jest.fn();

describe('beOps', () => {
  beforeAll(() => {
    console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);
  });

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
      statusText: 'Not Found',
    });

    await expect(beOps.checkHealth()).rejects.toThrow(
      'An unknown error occurred'
    );
  });
});

describe('taskOps', () => {
  beforeAll(() => {
    // Verify that the environment variables are mocked correctly
    console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get tasks successfully for BACKEND_TYPE 0', async () => {
    const mockResponse = {
      todos: [], // Ensure this matches the expected structure
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.getTasks();
    expect(result).toEqual({
      httpStatusCode: 200,
      resultMessage: 'Data fetched successfully',
      tasks: [],
    });
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/todos?limit=5&skip=10`,
      {
        //credentials: 'include',
      }
    );
  });

  // it('should get tasks successfully for BACKEND_TYPE not 0', async () => {
  //   (global as any).process.env.VITE_BACKEND_TYPE = '1';
  //   const mockResponse = {
  //     tasks: [], // Ensure this matches the expected structure
  //   };
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => mockResponse,
  //   });

  //   const result = await taskOps.getTasks();
  //   expect(result).toEqual({
  //     httpStatusCode: 200,
  //     resultMessage: 'Data fetched successfully',
  //     tasks: [],
  //   });
  //   expect(fetch).toHaveBeenCalledWith(
  //     `${process.env.VITE_BACKEND_URL}/tasks/all`,
  //     {
  //       //credentials: 'include',
  //     }
  //   );
  // });

  it('should handle errors when getting tasks', async () => {
    const errorData = { message: 'Not Found' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      json: async () => errorData,
    });

    await expect(taskOps.getTasks()).rejects.toThrow(
      'An unknown error occurred'
    );
  });

  it('should get a single task successfully', async () => {
    const mockResponse = {
      id: '1',
      name: 'Test Task',
      complete: false,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.getTask('1');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/tasks/task/1`,
      {
        credentials: 'include',
      }
    );
  });

  it('should handle errors when getting a single task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(taskOps.getTask('1')).rejects.toThrow(
      'An unknown error occurred'
    );
  });

  it('should add a task successfully', async () => {
    const mockTask: TaskProps = {
      id: '1',
      name: 'New Task',
      complete: false,
    };
    const mockResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task added successfully',
      tasks: [mockTask],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.addTask(mockTask);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/tasks/task`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockTask),
      }
    );
  });

  it('should handle errors when adding a task', async () => {
    const mockTask: TaskProps = {
      id: '1',
      name: 'New Task',
      complete: false,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    await expect(taskOps.addTask(mockTask)).rejects.toThrow(
      'An unknown error occurred'
    );
  });

  it('should update a task successfully', async () => {
    const mockTask: TaskProps = {
      id: '1',
      name: 'Updated Task',
      complete: true,
    };
    const mockResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task updated successfully',
      tasks: [mockTask],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.updateTask(mockTask);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/tasks/task/1`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockTask),
      }
    );
  });

  it('should handle errors when updating a task', async () => {
    const mockTask: TaskProps = {
      id: '1',
      name: 'Updated Task',
      complete: true,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    await expect(taskOps.updateTask(mockTask)).rejects.toThrow(
      'An unknown error occurred'
    );
  });

  it('should delete a task successfully', async () => {
    const mockResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task deleted successfully',
      tasks: [],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await taskOps.deleteTask('1');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_BACKEND_URL}/tasks/task/1`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
  });

  it('should handle errors when deleting a task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(taskOps.deleteTask('1')).rejects.toThrow(
      'An unknown error occurred'
    );
  });
});
