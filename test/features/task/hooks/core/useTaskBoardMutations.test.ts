/**
 * @jest-environment jsdom
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, act } from '@testing-library/react';

import { taskKeys } from '../../../../../src/features/task/hooks/core/queryKeys';

// Mocks
jest.mock('../../../../../src/shared/services/api/apiClient', () => ({
  taskOps: {
    addTask: jest.fn(),
    updateTask: jest.fn(),
    toggleTaskDone: jest.fn(),
    deleteTask: jest.fn(),
    getTasks: jest.fn(),
  },
}));

const handlers = {
  handleSuccess: jest.fn(),
  handleError: jest.fn(),
};
jest.mock('../../../../../src/shared/hooks/error/useCrudStatus', () => ({
  useCrudStatus: () => handlers,
}));

// Mock react-redux useSelector to control page/limit
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => selector({ taskUI: { page: 2, limit: 25 } }),
}));

import { taskOps } from '../../../../../src/shared/services/api/apiClient';
import { useTaskBoardMutations } from '../../../../../src/features/task/hooks/core/useTaskBoardMutations';

const renderWithClient = (client: QueryClient, child: React.ReactElement) =>
  render(React.createElement(QueryClientProvider as any, { client }, child));

// Helper component to grab hook instance synchronously
let hookRef: any = null;
const Host: React.FC = () => {
  hookRef = useTaskBoardMutations();
  return null;
};

describe('useTaskBoardMutations (AAA)', () => {
  beforeAll(() => {
    jest.setTimeout(15000);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    hookRef = null;
    jest.spyOn(Date, 'now').mockReturnValue(123456 as any);
    handlers.handleSuccess.mockReset();
    handlers.handleError.mockReset();
  });
  afterEach(() => {});

  it('addTask success triggers refresh flow and handleSuccess (AAA)', async () => {
    // Arrange
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
    });
    const invalidateSpy = jest.spyOn(client, 'invalidateQueries');
    const timeoutSpy = jest
      .spyOn(global, 'setTimeout' as any)
      .mockImplementation(((cb: Function) => {
        cb();
        return 0 as any;
      }) as any);
    const setQueryDataSpy = jest.spyOn(client, 'setQueryData');
    const refetchQueriesSpy = jest.spyOn(client, 'refetchQueries');

    (taskOps.addTask as jest.Mock).mockResolvedValue({ code: 200 });
    const freshData = { code: 200, data: { tasks: [], pagination: { page: 2 } } } as any;
    (taskOps.getTasks as jest.Mock).mockResolvedValue(freshData);

    await act(async () => {
      renderWithClient(client, React.createElement(Host));
      await Promise.resolve();
    });
    expect(hookRef).not.toBeNull();

    // Act
    await act(async () => {
      await hookRef!.addTask.mutateAsync({ title: 'x' } as any);
      await Promise.resolve();
    });

    // Assert
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: taskKeys.lists() });
    expect(taskOps.getTasks).toHaveBeenCalledWith({ page: 2, limit: 25, _t: 123456 });
    expect(setQueryDataSpy).toHaveBeenCalledWith(taskKeys.list({ page: 2, limit: 25 } as any), freshData);
    expect(refetchQueriesSpy).toHaveBeenCalledWith({ queryKey: taskKeys.list({ page: 2, limit: 25 } as any), exact: true });
    timeoutSpy.mockRestore();
  }, 15000);

  it('addTask error triggers handleError (AAA)', async () => {
    // Arrange
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
    });
    const error = new Error('fail');
    (taskOps.addTask as jest.Mock).mockRejectedValue(error);
    const timeoutSpy = jest
      .spyOn(global, 'setTimeout' as any)
      .mockImplementation(((cb: Function) => {
        cb();
        return 0 as any;
      }) as any);

    // Spy on shared handlers used by the hook
    const handleErrorSpy = handlers.handleError as jest.Mock;

    await act(async () => {
      renderWithClient(client, React.createElement(Host));
      await Promise.resolve();
    });
    expect(hookRef).not.toBeNull();

    // Act
    await act(async () => {
      await expect(hookRef!.addTask.mutateAsync({} as any)).rejects.toThrow('fail');
    });

    // Assert
    expect(handleErrorSpy).toHaveBeenCalledWith('create', error);
    timeoutSpy.mockRestore();
  }, 15000);

  it('update/toggle/delete also refresh on success (AAA)', async () => {
    // Arrange
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
    });
    const invalidateSpy = jest.spyOn(client, 'invalidateQueries');
    (taskOps.updateTask as jest.Mock).mockResolvedValue({ code: 200 });
    (taskOps.toggleTaskDone as jest.Mock).mockResolvedValue({ code: 200 });
    (taskOps.deleteTask as jest.Mock).mockResolvedValue({ code: 200 });
    (taskOps.getTasks as jest.Mock).mockResolvedValue({ code: 200, data: { tasks: [] } });
    const timeoutSpy = jest
      .spyOn(global, 'setTimeout' as any)
      .mockImplementation(((cb: Function) => {
        cb();
        return 0 as any;
      }) as any);

    await act(async () => {
      renderWithClient(client, React.createElement(Host));
      await Promise.resolve();
    });
    expect(hookRef).not.toBeNull();

    // Act
    await act(async () => {
      await hookRef!.updateTask.mutateAsync({ id: 1 } as any);
      await Promise.resolve();
    });
    await act(async () => {
      await hookRef!.toggleTaskDone.mutateAsync(1);
      await Promise.resolve();
    });
    await act(async () => {
      await hookRef!.deleteTask.mutateAsync(1);
      await Promise.resolve();
    });

    // Assert
    expect(invalidateSpy).toHaveBeenCalledTimes(3);
    timeoutSpy.mockRestore();
  }, 15000);
});


