import { handleResponse, handleError, makeRequest } from './apiHelpers';
import { BACKEND_URL } from '@/shared/utils/envvars';
import {
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
  }: PaginationParams): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task/list/page?page=${page}&limit=${limit}`;
    return makeRequest<TaskData>(url);
  },

  async getTask(id: number): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task/${id}`;
    return makeRequest<TaskData>(url);
  },

  async addTask(task: AddTaskProps): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task`;
    return makeRequest<TaskData>(url, {
      method: 'POST',
      //credentials: 'include',
      body: JSON.stringify(task),
    });
  },

  async updateTask(task: TaskProps): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task/${task.id}`;
    return makeRequest<TaskData>(url, {
      method: 'PATCH',
      //credentials: 'include',
      body: JSON.stringify(task),
    });
  },

  async toggleTaskDone(taskId: TaskIdentifier): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task/${taskId.id}/done`;
    return makeRequest<TaskData>(url, {
      method: 'PATCH',
      //credentials: 'include',
    });
  },

  async deleteTask(id: number): Promise<ApiResponse<TaskData>> {
    const url = `${BACKEND_URL}/tasks/task/${id}`;
    return makeRequest<TaskData>(url, {
      method: 'DELETE',
      //credentials: 'include',
    });
  },
};
