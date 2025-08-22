import { handleResponse, handleError, makeRequest } from './apiHelpers';
import { BACKEND_URL } from '@/shared/utils/envvars';
import { PaginationParams } from '@/shared/types/utils/pagination.type';
import { ApiResponse, UserProfileData } from '../../types/api.type';
import {
  HealthCheckData,
  AppHealthDetails,
  DbHealthDetails,
} from '@/shared/types/healthcheck/healthcheck.type';
import { SignUpProps, LoginProps } from '@/shared/types/domains/user.type';
import {
  TaskProps,
  TaskBoardData,
  AddTaskProps,
} from '@/shared/types/domains/task.type';

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

export const authOps = {
  async login(
    credentials: LoginProps
  ): Promise<ApiResponse<Record<string, unknown>>> {
    const url = `${BACKEND_URL}/users/login`;
    return makeRequest<Record<string, unknown>>(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
  },
  async signup(
    user: SignUpProps
  ): Promise<ApiResponse<Record<string, unknown>>> {
    const url = `${BACKEND_URL}/users/register`;
    return makeRequest<Record<string, unknown>>(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
    });
  },
  async logout(): Promise<ApiResponse<Record<string, unknown>>> {
    const url = `${BACKEND_URL}/users/logout`;
    return makeRequest<Record<string, unknown>>(url, {
      method: 'POST',
      credentials: 'include',
    });
  },
};

export const userOps = {
  async getCurrentUser(): Promise<ApiResponse<UserProfileData>> {
    const url = `${BACKEND_URL}/users/me`;
    return makeRequest<UserProfileData>(url, {
      method: 'GET',
      credentials: 'include',
    });
  },
};

export const taskOps = {
  async getTasks({
    page,
    limit,
    _t,
  }: PaginationParams): Promise<ApiResponse<TaskBoardData>> {
    const timestamp = _t ?? Date.now();

    const url = `${BACKEND_URL}/todos/list/page?page=${page}&limit=${limit}&_t=${timestamp}`;
    return makeRequest<TaskBoardData>(url);
  },

  async getTask(taskId: number): Promise<ApiResponse<TaskBoardData>> {
    const url = `${BACKEND_URL}/todos/task/${taskId}`;
    return makeRequest<TaskBoardData>(url);
  },

  async addTask(task: AddTaskProps): Promise<ApiResponse<TaskBoardData>> {
    const url = `${BACKEND_URL}/todos/create`;
    return makeRequest<TaskBoardData>(url, {
      method: 'POST',
      //credentials: 'include',
      body: JSON.stringify(task),
    });
  },

  async updateTask(task: TaskProps): Promise<ApiResponse<TaskBoardData>> {
    const url = `${BACKEND_URL}/todos/update/${task.id}`;
    return makeRequest<TaskBoardData>(url, {
      method: 'PATCH',
      //credentials: 'include',
      body: JSON.stringify(task),
    });
  },

  async toggleTaskDone(taskId: number): Promise<ApiResponse<TaskBoardData>> {
    const url = `${BACKEND_URL}/todos/task/${taskId}/done`;
    return makeRequest<TaskBoardData>(url, {
      method: 'PATCH',
      //credentials: 'include',
    });
  },

  async deleteTask(taskId: number): Promise<ApiResponse<TaskBoardData>> {
    const url = `${BACKEND_URL}/todos/delete/${taskId}`;
    return makeRequest<TaskBoardData>(url, {
      method: 'DELETE',
      //credentials: 'include',
    });
  },
};
