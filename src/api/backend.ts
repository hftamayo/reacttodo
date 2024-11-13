import { BACKEND_URL } from '../shared/utils/envvars';
import { ApiError, TaskProps, TaskResponse } from '../shared/types/task.type';

export const taskOps = {
  async getTasks(): Promise<TaskResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/all`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.response?.resultMessage || 'An unknown error occurred'
      );
    }
  },

  async getTask(id: string): Promise<TaskResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.response?.resultMessage || 'An unknown error occurred'
      );
    }
  },

  async addTask(task: TaskProps): Promise<TaskResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.response?.resultMessage || 'An unknown error occurred'
      );
    }
  },

  async updateTask(task: TaskProps): Promise<TaskResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${task.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.response?.resultMessage || 'An unknown error occurred'
      );
    }
  },

  async deleteTask(id: string): Promise<TaskResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.response?.resultMessage || 'An unknown error occurred'
      );
    }
  },
};
