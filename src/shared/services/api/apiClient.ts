import { BACKEND_URL } from '@/shared/utils/envvars';
import { cacheService } from './cacheService';
import {
  ApiError,
  HealthCheckData,
  TaskProps,
  TaskData,
  PaginationParams,
  ApiResponse,
  DbHealthDetails,
  AppHealthDetails,
  AddTaskProps,
  TaskIdentifier,
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
    throw error;
  }
  return await response.json();
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    showError(
      { code: 500, resultMessage: error.message },
      'An error occurred while processing your request.'
    );
  } else {
    showError(
      error as ApiError,
      'An error occurred while processing your request.'
    );
  }
  throw error;
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
  async getTasks({
    page,
    limit,
    cacheOptions = { useCache: true },
  }: PaginationParams): Promise<ApiResponse<TaskData>> {
    try {
      const url = `${BACKEND_URL}/tasks/task/list/page?page=${page}&limit=${limit}`;
      const cacheKey = url;
      const cachedRecord = cacheService.get(cacheKey);

      if (cacheOptions.invalidateCache) {
        cacheService.invalidateCache(BACKEND_URL);
      }

      // Prepare headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      // Add conditional headers if we have cached values
      if (cachedRecord) {
        if (cachedRecord.etag) {
          headers['If-None-Match'] = cachedRecord.etag;
        }
        if (cachedRecord.lastModified) {
          headers['If-Modified-Since'] = cachedRecord.lastModified;
        }

        if (cacheService.isValid(cacheKey)) {
          return cachedRecord.data;
        }
      }

      const response = await fetch(url, {
        headers,
        mode: 'cors',
      });

      // Handle 304 Not Modified - use cached data
      if (response.status === 304 && cachedRecord) {
        cacheService.updateTimestamp(cacheKey);
        return cachedRecord.data;
      }

      // Handle normal response
      if (response.ok) {
        const data: ApiResponse<TaskData> = await response.json();

        // Store in cache
        cacheService.set(
          cacheKey,
          data,
          response.headers.get('ETag') ?? undefined,
          response.headers.get('Last-Modified') ?? undefined,
          data.cacheTTL ?? 60
        );

        if (process.env.NODE_ENV === 'development') {
          console.log(`Cache ${cachedRecord ? 'HIT' : 'MISS'} for ${cacheKey}`);
          if (response?.status === 304)
            console.log(`304 Not Modified: ${cacheKey}`);
        }

        return data;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  invalidateCache: (taskId?: number) =>
    cacheService.invalidateCache(BACKEND_URL, taskId),

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
