import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { taskHooks } from './taskHooks';
import { taskService } from './taskService';
import { TaskProps, TaskResponse } from '../../../types/task.type';

const taskService = {
    fetchTasks: jest.fn(),
    fetchTask: jest.fn(),
    fetchAddTask: jest.fn(),
    fetchUpdateTask: jest.fn(),
    fetchDeleteTask: jest.fn(),
  };

jest.mock('./taskService');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('taskHooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch tasks successfully using useGetTasks', async () => {
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Data fetched successfully',
      tasks: [],
    };
    (taskService.fetchTasks as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => taskHooks.useGetTasks(true), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(taskService.fetchTasks).toHaveBeenCalled();
  });

  it('should fetch a single task successfully using useGetTask', async () => {
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Data fetched successfully',
      tasks: [{ id: '1', name: 'Test Task', complete: false }],
    };
    (taskService.fetchTask as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => taskHooks.useGetTask('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(taskService.fetchTask).toHaveBeenCalledWith('1');
  });

  it('should add a task successfully using useAddTask', async () => {
    const mockTask: TaskProps = { id: '1', name: 'New Task', complete: false };
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task added successfully',
      tasks: [mockTask],
    };
    (taskService.fetchAddTask as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => taskHooks.useAddTask(), { wrapper });

    act(() => {
      result.current.mutate(mockTask);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(taskService.fetchAddTask).toHaveBeenCalledWith(mockTask);
  });

  it('should update a task successfully using useUpdateTask', async () => {
    const mockTask: TaskProps = { id: '1', name: 'Updated Task', complete: true };
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task updated successfully',
      tasks: [mockTask],
    };
    (taskService.fetchUpdateTask as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => taskHooks.useUpdateTask(), { wrapper });

    act(() => {
      result.current.mutate(mockTask);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(taskService.fetchUpdateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should delete a task successfully using useDeleteTask', async () => {
    const mockResponse: TaskResponse = {
      httpStatusCode: 200,
      resultMessage: 'Task deleted successfully',
      tasks: [],
    };
    (taskService.fetchDeleteTask as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitFor } = renderHook(() => taskHooks.useDeleteTask('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockResponse);
    expect(taskService.fetchDeleteTask).toHaveBeenCalledWith('1');
  });
});