import { BACKEND_URL, BACKEND_TYPE } from '../../utils/envvars';
import { ApiError, TaskProps, TaskResponse } from '../../types/task.type';

export const beOps = {
  async checkHealth(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, {
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

export const taskOps = {
  async getTasks(): Promise<TaskResponse> {
    try {
      let url;
      if (BACKEND_TYPE === '0') {
        url = `${BACKEND_URL}/todos?limit=5&skip=10`;
      } else {
        url = `${BACKEND_URL}/tasks/all`;
      }
      //console.log('Fetching data from: ', url);
      const response = await fetch(url, {
        //credentials: 'include',
      });
      //console.log('Response:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Network response was not ok: ${response.statusText}. Data: ${JSON.stringify(errorData)}`
        );
      }
      const dataFetched = await response.json();
      //console.log('fetched data: ', dataFetched);

      let tasks: TaskProps[] = [];
      if (BACKEND_TYPE === '0') {
        if (!dataFetched.todos || !Array.isArray(dataFetched.todos)) {
          console.log('Invalid data structure fetched from API');
        }
        tasks = dataFetched.todos.map((todo: any) => ({
          id: todo.id,
          name: todo.todo,
          complete: todo.completed,
        }));
      } else {
        if (!dataFetched.tasks || !Array.isArray(dataFetched.tasks)) {
          throw new Error('Invalid data structure: tasks is not an array');
        }
        tasks = dataFetched.tasks;
      }

      return {
        httpStatusCode: 200,
        resultMessage: 'Data fetched successfully',
        tasks,
      };
    } catch (error: unknown) {
      console.error('Error reported: ', error);
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
