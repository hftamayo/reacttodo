import { QueryClient } from '@tanstack/react-query';
import { taskKeys } from '@/features/task/hooks/queryKeys';
import {
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
  TaskData,
  ApiResponse,
} from '@/shared/types/api.type';

export const optUpdates = {
  /**
   * Optimistically adds a task to the cache
   */
  optimisticAddTask: (queryClient: QueryClient, newTask: AddTaskProps) => {
    // Get current query cache for first page
    const previousTasks = queryClient.getQueryData<ApiResponse<TaskData>>(
      taskKeys.list({ page: 1, limit: 10 })
    );

    // Create an optimistic task with temporary ID and default values
    const optimisticTask: TaskProps = {
      id: Date.now(), // Temporary ID
      title: newTask.title,
      description: '',
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: newTask.owner,
    };

    // Add the optimistic task to the cache
    if (previousTasks?.data) {
      queryClient.setQueryData(taskKeys.list({ page: 1, limit: 10 }), {
        ...previousTasks,
        data: {
          ...previousTasks.data,
          tasks: [optimisticTask, ...previousTasks.data.tasks],
          pagination: {
            ...previousTasks.data.pagination,
            totalCount: previousTasks.data.pagination.totalCount + 1,
            totalPages: Math.ceil(
              (previousTasks.data.pagination.totalCount + 1) /
                previousTasks.data.pagination.limit
            ),
          },
        },
      });
    }

    return { previousTasks };
  },

  /**
   * Optimistically updates a task in the cache
   */
  optimisticUpdateTask: (queryClient: QueryClient, updatedTask: TaskProps) => {
    // Get current query cache for task detail
    const previousTask = queryClient.getQueryData<ApiResponse<TaskData>>(
      taskKeys.detail(updatedTask.id)
    );

    // Get current query cache for all task lists that might show this task
    const previousLists: { [key: string]: ApiResponse<TaskData> } = {};

    // Store all potentially affected list queries for rollback
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    listQueries.forEach(([queryKey, data]) => {
      if (data) {
        previousLists[JSON.stringify(queryKey)] = data;
      }
    });

    // Update the task in the detail view
    if (previousTask) {
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), {
        ...previousTask,
        data: {
          ...previousTask.data,
          tasks: [
            {
              ...previousTask.data?.tasks[0],
              ...updatedTask,
              updatedAt: new Date().toISOString(),
            },
          ],
        },
      });
    }

    // Update the task in all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        const tasks = [...data.data.tasks];
        const taskIndex = tasks.findIndex((t) => t.id === updatedTask.id);

        if (taskIndex !== -1) {
          tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updatedTask,
            updatedAt: new Date().toISOString(),
          };

          queryClient.setQueryData(queryKey, {
            ...data,
            data: {
              ...data.data,
              tasks,
            },
          });
        }
      }
    });

    return { previousTask, previousLists };
  },

  /**
   * Optimistically toggles a task's done status in the cache
   */
  optimisticToggleTask: (queryClient: QueryClient, taskId: TaskIdentifier) => {
    // Store previous values
    const previousTask = queryClient.getQueryData<ApiResponse<TaskData>>(
      taskKeys.detail(taskId.id)
    );

    const previousLists: { [key: string]: ApiResponse<TaskData> } = {};

    // Store all potentially affected list queries
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    listQueries.forEach(([queryKey, data]) => {
      if (data) {
        previousLists[JSON.stringify(queryKey)] = data;
      }
    });

    // Optimistically update the detail view
    if (previousTask?.data?.tasks?.[0]) {
      const currentTask = previousTask.data.tasks[0];

      queryClient.setQueryData(taskKeys.detail(taskId.id), {
        ...previousTask,
        data: {
          ...previousTask.data,
          tasks: [
            {
              ...currentTask,
              done: !currentTask.done,
              updatedAt: new Date().toISOString(),
            },
          ],
        },
      });
    }

    // Optimistically update all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        const tasks = [...data.data.tasks];
        const taskIndex = tasks.findIndex((t) => t.id === taskId.id);

        if (taskIndex !== -1) {
          tasks[taskIndex] = {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
            updatedAt: new Date().toISOString(),
          };

          queryClient.setQueryData(queryKey, {
            ...data,
            data: {
              ...data.data,
              tasks,
            },
          });
        }
      }
    });

    return { previousTask, previousLists };
  },

  /**
   * Optimistically removes a task from the cache
   */
  optimisticDeleteTask: (queryClient: QueryClient, id: number) => {
    // Store previous data for potential rollback
    const previousLists: { [key: string]: ApiResponse<TaskData> } = {};

    // Variables to track empty page detection
    let shouldNavigateToPreviousPage = false;
    let emptyPageNumber = 0;

    // Store all potentially affected list queries
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    listQueries.forEach(([queryKey, data]) => {
      if (data) {
        previousLists[JSON.stringify(queryKey)] = data;
      }
    });

    // Remove the task from all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        const tasks = data.data.tasks.filter((t) => t.id !== id);

        // Check if task was actually removed from this page
        const wasRemoved = tasks.length < data.data.tasks.length;

        // Extract page information from query key
        const keyObj = JSON.parse(JSON.stringify(queryKey));
        const page = keyObj[1]?.page || 1;

        // Calculate if this page will be empty after deletion
        if (wasRemoved && tasks.length === 0 && page > 1) {
          shouldNavigateToPreviousPage = true;
          emptyPageNumber = page;
        }

        queryClient.setQueryData(queryKey, {
          ...data,
          data: {
            ...data.data,
            tasks,
            pagination: {
              ...data.data.pagination,
              totalCount: wasRemoved
                ? data.data.pagination.totalCount - 1
                : data.data.pagination.totalCount,
              totalPages: wasRemoved
                ? Math.ceil(
                    (data.data.pagination.totalCount - 1) /
                      data.data.pagination.limit
                  )
                : data.data.pagination.totalPages,
            },
          },
        });
      }
    });

    // Remove the task detail from cache
    queryClient.removeQueries({ queryKey: taskKeys.detail(id) });

    return {
      previousLists,
      shouldNavigateToPreviousPage,
      emptyPageNumber,
    };
  },
};
