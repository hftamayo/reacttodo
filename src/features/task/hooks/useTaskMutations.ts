import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import {
  TaskContext,
  TaskData,
  AddTaskProps,
  TaskProps,
  TaskIdentifier,
  ApiResponse,
} from '@/shared/types/api.type';
import { taskOps } from '@/shared/services/api/apiClient';
import { showError } from '@/shared/services/notification/notificationService';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const invalidateTasks = () => {
    // Helper to invalidate tasks in React Query and HTTP cache
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    taskOps.invalidateCache();
  };

  const getCurrentTasksData = () => {
    // Get all task queries from cache
    const queries = queryClient.getQueryCache().findAll({
      predicate: (query) => query.queryKey[0] === 'tasks',
    });

    return queries.map((query) => ({
      queryKey: query.queryKey,
      data: query.state.data as ApiResponse<TaskData> | undefined,
    }));
  };

  const addTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    AddTaskProps,
    TaskContext
  >({
    mutationFn: taskService.fetchAddTask,
    onMutate: async (newTask: AddTaskProps) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'tasks',
      });

      const taskQueries = getCurrentTasksData();
      const tempId = Date.now();
      const newTaskWithId = {
        ...newTask,
        id: tempId,
        createdAt: new Date().toISOString(),
        done: false,
      } as TaskProps;

      // Update all task queries in cache
      taskQueries.forEach(({ queryKey, data }) => {
        if (data) {
          const currentPage = (queryKey[1] as { page: number })?.page || 1;
          const isFirstPage = currentPage === 1;

          if (isFirstPage) {
            queryClient.setQueryData<ApiResponse<TaskData>>(queryKey, {
              ...data,
              data: {
                ...data.data,
                tasks: [newTaskWithId, ...data.data.tasks],
                pagination: {
                  ...data.data.pagination,
                  totalCount: data.data.pagination.totalCount + 1,
                },
              },
            });
          } else {
            // For other pages, just update the total count
            queryClient.setQueryData<ApiResponse<TaskData>>(queryKey, {
              ...data,
              data: {
                ...data.data,
                pagination: {
                  ...data.data.pagination,
                  totalCount: data.data.pagination.totalCount + 1,
                },
              },
            });
          }
        }
      });

      return { previousQueries: taskQueries };
    },
    onError: (error, _newTask, context) => {
      if (error) {
        showError(
          'Add task operation:',
          'An error occurred while adding the task.'
        );
      }
      // Restore previous state for all queries
      context?.previousQueries?.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData(queryKey, data);
        }
      });
    },
    onSettled: () => {
      invalidateTasks();
    },
    onSuccess: (data) => {
      // Update individual task cache if needed
      if (data?.data?.tasks?.[0]) {
        const newTask = data.data.tasks[0];
        queryClient.setQueryData(['task', newTask.id], {
          code: 200,
          resultMessage: 'Success',
          data: {
            tasks: [newTask],
            pagination: {
              totalCount: 1,
              limit: 1,
              currentPage: 1,
              totalPages: 1,
            },
          },
        });
      }
    },
  });

  const updateTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    TaskProps,
    TaskContext
  >({
    mutationFn: taskService.fetchUpdateTask,
    onMutate: async (updatedTask: TaskProps) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'tasks',
      });

      const taskQueries = getCurrentTasksData();

      // Update all task queries in cache
      taskQueries.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData<ApiResponse<TaskData>>(queryKey, {
            ...data,
            data: {
              ...data.data,
              tasks: data.data.tasks.map((task: TaskProps) =>
                task.id === updatedTask.id
                  ? { ...updatedTask, updatedAt: new Date().toISOString() }
                  : task
              ),
            },
          });
        }
      });

      return { previousQueries: taskQueries };
    },
    onError: (error, _updatedTask, context) => {
      if (error) {
        showError(
          'Update task operation:',
          'An error occurred while updating the task.'
        );
      }
      // Restore previous state for all queries
      context?.previousQueries?.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData(queryKey, data);
        }
      });
    },
    onSettled: () => {
      invalidateTasks();
    },
    onSuccess: (data) => {
      // Update individual task cache if needed
      if (data?.data?.tasks?.[0]) {
        const newTask = data.data.tasks[0];
        queryClient.setQueryData(['task', newTask.id], {
          code: 200,
          resultMessage: 'Success',
          data: {
            tasks: [newTask],
            pagination: {
              totalCount: 1,
              limit: 1,
              currentPage: 1,
              totalPages: 1,
            },
          },
        });
      }
    },
  });

  const toggleTaskDone = useMutation<
    ApiResponse<TaskData>,
    Error,
    TaskIdentifier,
    TaskContext
  >({
    mutationFn: taskService.fetchToggleTaskDone,
    onMutate: async (taskId: TaskIdentifier) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'tasks',
      });

      const taskQueries = getCurrentTasksData();

      // Update all task queries in cache
      taskQueries.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData<ApiResponse<TaskData>>(queryKey, {
            ...data,
            data: {
              ...data.data,
              tasks: data.data.tasks.map((task) =>
                task.id === taskId.id ? { ...task, done: !task.done } : task
              ),
            },
          });
        }
      });

      return { previousQueries: taskQueries };
    },
    onError: (error, _, context) => {
      if (error) {
        showError(
          'Toggle task operation:',
          'Failed to toggle task completion status'
        );
      }
      // Restore previous state for all queries
      context?.previousQueries?.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData(queryKey, data);
        }
      });
    },
    onSettled: () => {
      invalidateTasks();
    },
    onSuccess: (data) => {
      // Update individual task cache if needed
      if (data?.data?.tasks?.[0]) {
        const newTask = data.data.tasks[0];
        queryClient.setQueryData(['task', newTask.id], {
          code: 200,
          resultMessage: 'Success',
          data: {
            tasks: [newTask],
            pagination: {
              totalCount: 1,
              limit: 1,
              currentPage: 1,
              totalPages: 1,
            },
          },
        });
      }
    },
  });

  const deleteTask = useMutation<
    ApiResponse<TaskData>,
    Error,
    number,
    { previousTasksData: unknown }
  >({
    mutationFn: (id: number) => taskService.fetchDeleteTask(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'tasks',
      });

      const taskQueries = getCurrentTasksData();

      // Update all task queries in cache
      taskQueries.forEach(({ queryKey, data }) => {
        if (data) {
          queryClient.setQueryData<ApiResponse<TaskData>>(queryKey, {
            ...data,
            data: {
              ...data.data,
              tasks: data.data.tasks.filter((task) => task.id !== deletedId),
              pagination: {
                ...data.data.pagination,
                totalCount: data.data.pagination.totalCount - 1,
              },
            },
          });
        }
      });

      return { previousTasksData: taskQueries };
    },
    onError: (error, _, context) => {
      if (error) {
        showError(
          'Delete task operation:',
          'An error occurred while deleting the task.'
        );
      }
      // Restore previous state for all queries
      if (context?.previousTasksData) {
        const previousQueries = context.previousTasksData as {
          queryKey: QueryKey;
          data: ApiResponse<TaskData>;
        }[];
        previousQueries.forEach(({ queryKey, data }) => {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        });
      }
    },
    onSuccess: (_, deletedId) => {
      // Invalidate all related caches
      invalidateTasks();

      // Also invalidate specific task
      taskOps.invalidateCache(deletedId);
    },
  });

  return {
    addTask,
    updateTask,
    toggleTaskDone,
    deleteTask,
  };
};
