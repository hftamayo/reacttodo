/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useTaskQueries } from '../../../../../src/features/task/hooks/core/useTaskQueries';

jest.mock('../../../../../src/shared/services/api/apiClient', () => ({
  taskOps: {
    getTasks: jest.fn(),
    getTask: jest.fn(),
  },
}));

import { taskOps } from '../../../../../src/shared/services/api/apiClient';

const createWrapper = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const Wrapper = (props: { children?: React.ReactNode }) => (
    React.createElement(QueryClientProvider as any, { client }, props.children as any)
  );
  return { Wrapper, client };
};

type QueryState<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: T;
  error?: unknown;
};

const GetTasksComponent: React.FC<{ params: any; onState: (s: QueryState<any>) => void }> = ({ params, onState }) => {
  const { data, isLoading, isSuccess, isError, error } = (useTaskQueries.getTasks as any)(params);
  React.useEffect(() => {
    onState({ data, isLoading, isSuccess, isError, error });
  }, [data, isLoading, isSuccess, isError, error, onState]);
  return null;
};

const GetTaskComponent: React.FC<{ id: number; onState: (s: QueryState<any>) => void }> = ({ id, onState }) => {
  const { data, isLoading, isSuccess, isError, error } = (useTaskQueries.getTask as any)(id);
  React.useEffect(() => {
    onState({ data, isLoading, isSuccess, isError, error });
  }, [data, isLoading, isSuccess, isError, error, onState]);
  return null;
};

describe('useTaskQueries (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('fetches tasks with given params (AAA)', async () => {
      // Arrange
      const { Wrapper } = createWrapper();
      const params = { page: 2, limit: 25 } as any;
      const mocked = { code: 200, data: { tasks: [], pagination: { page: 2 } } } as any;
      (taskOps.getTasks as jest.Mock).mockResolvedValue(mocked);

      const container = document.createElement('div');
      document.body.appendChild(container);
      let state: any = null;
      ReactDOM.render(
        React.createElement(Wrapper, {
          children: React.createElement(GetTasksComponent, { params, onState: (s: any) => { state = s; } })
        }),
        container
      );

      // Assert
      while (!state?.isSuccess && !state?.isError) {
        await new Promise((r) => setTimeout(r, 0));
      }
      expect(taskOps.getTasks).toHaveBeenCalledWith(params);
      expect(state!.data).toBe(mocked);
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    });

    it('sets error state on failure (AAA)', async () => {
      // Arrange
      const { Wrapper } = createWrapper();
      const params = { page: 1, limit: 10 } as any;
      (taskOps.getTasks as jest.Mock).mockRejectedValue(new Error('boom'));

      const container = document.createElement('div');
      document.body.appendChild(container);
      let state: any = null;
      ReactDOM.render(
        React.createElement(Wrapper, {
          children: React.createElement(GetTasksComponent, { params, onState: (s: any) => { state = s; } })
        }),
        container
      );

      while (!state?.isError) {
        await new Promise((r) => setTimeout(r, 0));
      }
      expect(taskOps.getTasks).toHaveBeenCalledWith(params);
      expect(String(state!.error)).toContain('boom');
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    });
  });

  describe('getTask', () => {
    it('fetches a task when id is truthy (AAA)', async () => {
      // Arrange
      const { Wrapper } = createWrapper();
      const mocked = { code: 200, data: { id: 7 } } as any;
      (taskOps.getTask as jest.Mock).mockResolvedValue(mocked);

      const container = document.createElement('div');
      document.body.appendChild(container);
      let state: any = null;
      ReactDOM.render(
        React.createElement(Wrapper, {
          children: React.createElement(GetTaskComponent, { id: 7, onState: (s: any) => { state = s; } })
        }),
        container
      );

      while (!state?.isSuccess && !state?.isError) {
        await new Promise((r) => setTimeout(r, 0));
      }
      expect(taskOps.getTask).toHaveBeenCalledWith(7);
      expect(state!.data).toBe(mocked);
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    });

    it('does not run when id is falsy (enabled=false) (AAA)', async () => {
      // Arrange
      const { Wrapper } = createWrapper();
      const container = document.createElement('div');
      document.body.appendChild(container);
      let state: any = null;
      ReactDOM.render(
        React.createElement(Wrapper, {
          children: React.createElement(GetTaskComponent, { id: 0 as any, onState: (s: any) => { state = s; } })
        }),
        container
      );

      expect(taskOps.getTask).not.toHaveBeenCalled();
      expect(!state?.isLoading && !state?.isSuccess).toBe(true);
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    });
  });
});


