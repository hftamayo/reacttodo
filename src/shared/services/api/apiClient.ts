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
  TaskIdentifier,
  CursorParams,
  OffsetParams,
} from '../../types/api.type';
import { showError } from '../notification/notificationService';

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: ApiError = {
      code: response.status,
      resultMessage: `Network response was not ok: ${response.statusText}. Data: ${JSON.stringify(errorData)}`,
    };
    handleError(error);
  }
  return await response.json();
};

const handleError = (error: unknown) => {
  showError(
    error as ApiError,
    'An error occurred while processing your request.'
  );
  throw new Error((error as ApiError).resultMessage);
};

export const beOps = {
  async appHealth(): Promise<ApiResponse<HealthCheckData<AppHealthDetails>>> {
    try {
      const startTime = performance.now();
      const response = await fetch(`${BACKEND_URL}/tasks/healthcheck/app`, {
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
      const response = await fetch(`${BACKEND_URL}/tasks/healthcheck/db`, {
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
  async getTasksWithCursor({
    limit,
    cursor,
  }: CursorParams): Promise<ApiResponse<TaskData>> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', String(limit));
      if (cursor) {
        queryParams.append('cursor', cursor);
      }

      const url = `${BACKEND_URL}/tasks/task/list?${queryParams.toString()}`;
      return await handleFetch(url);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async getTasksWithOffset({
    page,
    limit,
  }: OffsetParams): Promise<ApiResponse<TaskData>> {
    try {
      const url = `${BACKEND_URL}/tasks/task/list/page?page=${page}&limit=${limit}`;
      return await handleFetch(url);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async getTask(id: number): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
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
          Accept: 'application/json',
        },
        mode: 'cors',
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
        method: 'PATCH',
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(task),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async toggleTaskDone(taskId: TaskIdentifier): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(
        `${BACKEND_URL}/tasks/task/${taskId.id}/done`,
        {
          method: 'PATCH',
          //credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          mode: 'cors',
        }
      );
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async deleteTask(id: number): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        method: 'DELETE',
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },
};
