import { QueryClient } from '@tanstack/react-query';
import { taskKeys } from '@/features/task/hooks/core/queryKeys';
import {
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
  TaskData,
  ApiResponse,
  PaginationParams,
} from '@/shared/types/api.type';

type OptimisticUpdateResult = {
  previousData: ApiResponse<TaskData> | undefined;
};

type OptimisticListUpdateResult = {
  previousData: { [key: string]: ApiResponse<TaskData> };
};

type OptimisticDeleteResult = OptimisticListUpdateResult & {
  shouldNavigateToPreviousPage: boolean;
  emptyPageNumber: number;
};

export const optUpdates = {
  /**
   * Optimistically adds a task to the cache
   */
  optimisticAddTask: (
    queryClient: QueryClient,
    newTask: AddTaskProps,
    paginationParams: PaginationParams
  ): OptimisticUpdateResult => {
    // Get current query cache for the current page
    const currentPageData = queryClient.getQueryData<ApiResponse<TaskData>>(
      taskKeys.list(paginationParams)
    );

    // Create an optimistic task
    const optimisticTask: TaskProps = {
      id: Date.now(), // Temporary ID
      title: newTask.title,
      description: '', // Default empty description since it's not in AddTaskProps
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: newTask.owner,
    };

    // Update the current page if it exists
    if (currentPageData?.data) {
      queryClient.setQueryData(taskKeys.list(paginationParams), {
        ...currentPageData,
        data: {
          ...currentPageData.data,
          tasks: [optimisticTask, ...currentPageData.data.tasks],
          pagination: {
            ...currentPageData.data.pagination,
            totalCount: currentPageData.data.pagination.totalCount + 1,
            totalPages: Math.ceil(
              (currentPageData.data.pagination.totalCount + 1) /
                currentPageData.data.pagination.limit
            ),
          },
        },
      });
    }

    return { previousData: currentPageData };
  },

  /**
   * Optimistically updates a task in the cache
   */
  optimisticUpdateTask: (
    queryClient: QueryClient,
    updatedTask: TaskProps,
    paginationParams: PaginationParams
  ): OptimisticListUpdateResult => {
    // Get all list queries that might contain this task
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    const previousData: { [key: string]: ApiResponse<TaskData> } = {};

    // Update the task in all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        previousData[JSON.stringify(queryKey)] = data;

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

    return { previousData };
  },

  /**
   * Optimistically toggles a task's done status
   */
  optimisticToggleTask: (
    queryClient: QueryClient,
    taskId: TaskIdentifier,
    paginationParams: PaginationParams
  ): OptimisticListUpdateResult => {
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    const previousData: { [key: string]: ApiResponse<TaskData> } = {};

    // Update all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        previousData[JSON.stringify(queryKey)] = data;

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

    return { previousData };
  },

  /**
   * Optimistically removes a task from the cache
   */
  optimisticDeleteTask: (
    queryClient: QueryClient,
    id: number,
    paginationParams: PaginationParams
  ): OptimisticDeleteResult => {
    const listQueries = queryClient.getQueriesData<ApiResponse<TaskData>>({
      queryKey: taskKeys.lists(),
    });

    const previousData: { [key: string]: ApiResponse<TaskData> } = {};
    let shouldNavigateToPreviousPage = false;
    let emptyPageNumber = 0;

    // Update all list views
    listQueries.forEach(([queryKey, data]) => {
      if (data?.data?.tasks) {
        previousData[JSON.stringify(queryKey)] = data;

        const tasks = data.data.tasks.filter((t) => t.id !== id);
        const wasRemoved = tasks.length < data.data.tasks.length;

        // Check if this page will be empty after deletion
        if (wasRemoved && tasks.length === 0 && paginationParams.page > 1) {
          shouldNavigateToPreviousPage = true;
          emptyPageNumber = paginationParams.page;
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

    return {
      previousData,
      shouldNavigateToPreviousPage,
      emptyPageNumber,
    };
  },
};
