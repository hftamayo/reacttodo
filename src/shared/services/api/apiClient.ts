import { BACKEND_URL } from '@/shared/utils/envvars';
import { cacheService } from './cacheService';
import {
  addConditionalCacheHeaders,
  saveToCache,
  logCacheStatus,
} from './apiHelpers';
import { showError } from '../notification/notificationService';
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

      if (cachedRecord && cacheService.isValid(cacheKey)) {
        return cachedRecord.data as ApiResponse<TaskData>;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      addConditionalCacheHeaders(headers, cachedRecord);

      const response = await fetch(url, { headers, mode: 'cors' });

      if (response.status === 304 && cachedRecord) {
        cacheService.updateTimestamp(cacheKey);
        logCacheStatus(cacheKey, cachedRecord, response);
        return cachedRecord.data as ApiResponse<TaskData>;
      }

      if (response.ok) {
        const data = await handleResponse<TaskData>(response);
        saveToCache(cacheKey, data, response);
        logCacheStatus(cacheKey, cachedRecord, response);
        return data;
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async getTask(id: number): Promise<ApiResponse<TaskData>> {
    try {
      const url = `${BACKEND_URL}/tasks/task/${id}`;
      const cacheKey = url;
      const cachedRecord = cacheService.get<TaskData>(cacheKey);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      addConditionalCacheHeaders(headers, cachedRecord);

      if (cachedRecord && cacheService.isValid(cacheKey)) {
        logCacheStatus(cacheKey, cachedRecord);
        return cachedRecord.data as ApiResponse<TaskData>;
      }

      const response = await fetch(url, {
        headers,
        mode: 'cors',
      });

      if (response.status === 304 && cachedRecord) {
        cacheService.updateTimestamp(cacheKey);
        logCacheStatus(cacheKey, cachedRecord, response);
        return cachedRecord.data as ApiResponse<TaskData>;
      }

      if (response.ok) {
        const responseClone = response.clone(); // Clone the response to read twice
        const data = (await response.json()) as ApiResponse<TaskData>;

        saveToCache(cacheKey, data, responseClone);
        logCacheStatus(cacheKey, cachedRecord, response);
        return data;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async addTask(task: AddTaskProps): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(task),
      });

      // Let handleResponse take care of error checking and parsing
      const data = await handleResponse<TaskData>(response);

      // After successful addition, invalidate task list caches
      this.invalidateCache();

      if (process.env.NODE_ENV === 'development') {
        console.log('Task added, cache invalidated');
      }

      return data;
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async updateTask(task: TaskProps): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(task),
      });

      const data = await handleResponse<TaskData>(response);

      this.invalidateCache(task.id);

      if (process.env.NODE_ENV === 'development') {
        console.log(`Task ${task.id} updated, cache invalidated`);
      }

      return data;
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

      const data = await handleResponse<TaskData>(response);

      // After successful addition, invalidate task list caches
      this.invalidateCache();

      if (process.env.NODE_ENV === 'development') {
        console.log(`Task ${taskId.id} status updated, cache invalidated`);
      }

      return data;
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  async deleteTask(id: number): Promise<ApiResponse<TaskData>> {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
      });

      const data = await handleResponse<TaskData>(response);

      this.invalidateCache(id);

      if (process.env.NODE_ENV === 'development') {
        console.log(`Task ${id} deleted, cache invalidated`);
      }

      return data;
    } catch (error: unknown) {
      handleError(error);
      throw error;
    }
  },

  invalidateCache: (taskId?: number) =>
    cacheService.invalidateCache(BACKEND_URL, taskId),
};
