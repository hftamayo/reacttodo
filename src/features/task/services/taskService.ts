import { taskOps } from '@/shared/services/api/apiClient';
import {
  AddTaskProps,
  TaskProps,
  TaskData,
  ApiResponse,
  TaskIdentifier,
  CursorParams,
  OffsetParams,
} from '@/shared/types/api.type';

const fetchTasksWithCursor = async ({
  limit,
  cursor,
}: CursorParams): Promise<ApiResponse<TaskData>> => {
  try {
    const response = await taskOps.getTasksWithCursor({
      type: 'cursor',
      limit,
      cursor,
    });

    if (!response) {
      throw new Error('No response from server');
    }

    return response;
  } catch (error) {
    console.error('Error fetching tasks with cursor:', error);
    throw error; // Let the caller handle the error
  }
};

const fetchTasksWithOffset = async ({
  page,
  limit,
}: OffsetParams): Promise<ApiResponse<TaskData>> => {
  try {
    const response = await taskOps.getTasksWithOffset({
      type: 'offset',
      page,
      limit,
    });

    if (!response) {
      throw new Error('No response from server');
    }

    return response;
  } catch (error) {
    console.error('Error fetching tasks with offset:', error);
    throw error; // Let the caller handle the error
  }
};

const fetchTask = async (id: number): Promise<ApiResponse<TaskData>> => {
  try {
    if (!id) throw new Error('Task ID is required');
    return await taskOps.getTask(id);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch task with id: ${id}`, error.message);
    } else {
      console.error(`Failed to fetch task with id: ${id}`, error);
    }
    throw new Error(`Failed to fetch task with id: ${id}`);
  }
};

const fetchAddTask = async (
  task: AddTaskProps
): Promise<ApiResponse<TaskData>> => {
  try {
    if (!task.title) throw new Error('Task title is required');
    return await taskOps.addTask(task);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to add task', error.message);
    } else {
      console.error('Failed to add task', error);
    }
    throw new Error('Failed to add task');
  }
};

const fetchUpdateTask = async (
  task: TaskProps
): Promise<ApiResponse<TaskData>> => {
  try {
    if (!task.id) throw new Error('Task ID is required');
    if (!task.title) throw new Error('Task title is required');
    return await taskOps.updateTask(task);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to update task with id: ${task.id}`, error.message);
    } else {
      console.error(`Failed to update task with id: ${task.id}`, error);
    }
    throw new Error(`Failed to update task with id: ${task.id}`);
  }
};

const fetchToggleTaskDone = async (
  taskId: TaskIdentifier
): Promise<ApiResponse<TaskData>> => {
  try {
    if (!taskId.id) throw new Error('Task ID is required');

    return await taskOps.toggleTaskDone(taskId);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Failed to toggle task done state for id: ${taskId.id}`,
        error.message
      );
    } else {
      console.error(
        `Failed to toggle task done state for id: ${taskId.id}`,
        error
      );
    }
    throw new Error(`Failed to toggle task done state for id: ${taskId.id}`);
  }
};

const fetchDeleteTask = async (id: number): Promise<ApiResponse<TaskData>> => {
  try {
    if (!id) throw new Error('Task ID is required');
    return await taskOps.deleteTask(id);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to delete task with id: ${id}`, error.message);
    } else {
      console.error(`Failed to delete task with id: ${id}`, error);
    }
    throw new Error(`Failed to delete task with id: ${id}`);
  }
};

export const taskService = {
  fetchTasksWithCursor,
  fetchTasksWithOffset,
  fetchTask,
  fetchAddTask,
  fetchUpdateTask,
  fetchToggleTaskDone,
  fetchDeleteTask,
};
