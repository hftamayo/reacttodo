import axios from 'axios';
import { BACKEND_URL } from '../shared/utils/envvars';
import { ApiError, TaskResponse } from '../shared/types/task.type';

const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const taskOps = {
  async getTasks(): Promise<TaskResponse> {
    try {
      const response = await instance.get(`${BACKEND_URL}/tasks/all`);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
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
