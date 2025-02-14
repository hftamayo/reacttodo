import { BACKEND_URL } from '@/shared/utils/envvars';
import {
  ApiError,
  HealthCheckData,
  TaskProps,
  TaskData,
  ApiResponse,
  DbHealthDetails,
  AppHealthDetails,
} from '../../types/api.type';

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
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
  throw new Error(`${apiError.httpStatusCode} ${apiError.resultMessage}`);
};

export const beOps = {
  async appHealth(): Promise<
    ApiResponse<HealthCheckData<AppHealthDetails>> | undefined
  > {
    try {
      const response = await fetch(`${BACKEND_URL}/healthcheck/app`, {
        //credentials: 'include',
      });
      return await handleResponse<HealthCheckData<AppHealthDetails>>(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async dbHealth(): Promise<
    ApiResponse<HealthCheckData<DbHealthDetails>> | undefined
  > {
    try {
      const response = await fetch(`${BACKEND_URL}/healthcheck/db`, {
        //credentials: 'include',
      });
      return await handleResponse<HealthCheckData<DbHealthDetails>>(response);
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },
};

export const taskOps = {
  async getTasks(): Promise<ApiResponse<TaskData> | undefined> {
    try {
      const url = `${BACKEND_URL}/todos?limit=5&skip=10`;
      const response = await fetch(url, {
        //credentials: 'include',
      });
      const dataFetched = await handleResponse<TaskData>(response);

      const tasks: TaskProps[] = dataFetched.data.tasks.map(
        (todo: TaskProps) => ({
          id: todo.id,
          name: todo.name,
          completed: todo.completed,
        })
      );

      return {
        httpStatusCode: 200,
        resultMessage: 'Data fetched successfully',
        data: { tasks },
      };
    } catch (error: unknown) {
      handleError(error);
      return undefined;
    }
  },

  async getTask(id: string): Promise<ApiResponse<TaskData> | undefined> {
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

  async addTask(task: TaskProps): Promise<ApiResponse<TaskData> | undefined> {
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

  async updateTask(
    task: TaskProps
  ): Promise<ApiResponse<TaskData> | undefined> {
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

  async deleteTask(id: string): Promise<ApiResponse<TaskData> | undefined> {
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
