import { BACKEND_URL, BACKEND_TYPE } from '@/shared/utils/envvars';
import { ApiError, TaskProps, TaskResponse } from '../../types/task.type';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Network response was not ok: ${response.statusText}. Data: ${JSON.stringify(errorData)}`
    );
  }
  return await response.json();
};

const handleError = (error: unknown) => {
  const apiError = error as ApiError;
  throw new Error(
    apiError.response?.resultMessage || 'An unknown error occurred'
  );
};

export const beOps = {
  async checkHealth(): Promise<{ status: string } | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, {
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },
};

export const taskOps = {
  async getTasks(): Promise<TaskResponse | undefined> {
    try {
      const url =
        BACKEND_TYPE === '0'
          ? `${BACKEND_URL}/todos?limit=5&skip=10`
          : `${BACKEND_URL}/tasks/all`;
      const response = await fetch(url, {
        //credentials: 'include',
      });
      const dataFetched = await handleResponse<TaskResponse>(response);

      const tasks: TaskProps[] =
        BACKEND_TYPE === '0'
          ? dataFetched.tasks.map((todo: TaskProps) => ({
              id: todo.id,
              name: todo.name,
              complete: todo.complete,
            }))
          : dataFetched.tasks;

      return {
        httpStatusCode: 200,
        resultMessage: 'Data fetched successfully',
        tasks,
      };
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async getTask(id: string): Promise<TaskResponse | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async addTask(task: TaskProps): Promise<TaskResponse | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async updateTask(task: TaskProps): Promise<TaskResponse | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${task.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async deleteTask(id: string): Promise<TaskResponse | undefined> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },
};
