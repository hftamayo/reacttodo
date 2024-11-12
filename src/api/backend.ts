import { BACKEND_URL } from '../shared/utils/envvars';
import { ApiError, TaskResponse } from '../shared/types/task.type';

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

  async getTask(id: string) {
    const response = await instance.get(`${BACKEND_URL}/tasks/task/${id}`);
    return response.data;
  },
  async addTask(role: any) {
    const response = await instance.post(`${BACKEND_URL}/tasks/task`, role);
    return response.data;
  },
  async updateTask(role: any) {
    const response = await instance.put(
      `${BACKEND_URL}/tasks/task/${role.id}`,
      role
    );
    return response.data;
  },
  async deleteTask(id: string) {
    const response = await instance.delete(`${BACKEND_URL}/tasks/task/${id}`);
    return response.data;
  },
};
