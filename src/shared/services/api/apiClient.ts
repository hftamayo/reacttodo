import { BACKEND_URL } from '@/shared/utils/envvars';
import {
  ApiError,
  HealthCheckData,
  TaskProps,
  TaskData,
  ApiResponse,
  DbHealthDetails,
  AppHealthDetails,
  AddTaskProps,
} from '../../types/api.type';
import { getErrorMessage, showApiError } from '@/shared/utils/error/errorUtils';

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: ApiError = {
      httpStatusCode: response.status,
      resultMessage: `Network response was not ok: ${response.statusText}. Data: ${JSON.stringify(errorData)}`,
    };
    handleError(error);
  }
  return await response.json();
};

const handleError = (error: unknown) => {
  const errorMessage = getErrorMessage(error as ApiError);
  showApiError(error as ApiError, errorMessage);
  throw new Error(errorMessage);
};

export const beOps = {
  async appHealth(): Promise<ApiResponse<HealthCheckData<AppHealthDetails>>> {
    try {
      const startTime = performance.now();
      const response = await fetch(`${BACKEND_URL}/healthcheck/app`, {
        //credentials: 'include',
      });
      const data =
        await handleResponse<HealthCheckData<AppHealthDetails>>(response);
      if (data.data.healthCheck.details) {
        data.data.healthCheck.details.startTime = startTime;
      }
      return data;
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async dbHealth(): Promise<ApiResponse<HealthCheckData<DbHealthDetails>>> {
    try {
      const response = await fetch(`${BACKEND_URL}/healthcheck/db`, {
        //credentials: 'include',
      });
      return await handleResponse<HealthCheckData<DbHealthDetails>>(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },
};

export const taskOps = {
  async getTasks(): Promise<ApiResponse<TaskData>> {
    try {
      const url = `${BACKEND_URL}/todos?limit=5&skip=10`;
      const response = await fetch(url, {
        //credentials: 'include',
      });
      const dataFetched = await handleResponse<TaskData>(response);

      const tasks: TaskProps[] = dataFetched.data.tasks.map(
        (todo: TaskProps) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          done: todo.done,
          owner: todo.owner,
        })
      );

      return {
        httpStatusCode: 200,
        resultMessage: 'Data fetched successfully',
        data: { tasks },
      };
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async getTask(id: string): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        //credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async addTask(task: AddTaskProps): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task`, {
        method: 'POST',
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async updateTask(task: TaskProps): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${task.id}`, {
        method: 'PUT',
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        method: 'DELETE',
        //credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },
};
