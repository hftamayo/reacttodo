/**
 * @jest-environment jsdom
 */

import { useTaskPrefetching } from '../../../../../src/features/task/hooks/core/useTaskPreFetching';
import { taskOps } from '../../../../../src/shared/services/api/apiClient';
import { queryClient } from '../../../../../src/shared/services/cache/queryClient';
import { taskKeys } from '../../../../../src/features/task/hooks/core/queryKeys';

jest.mock('../../../../../src/shared/services/api/apiClient', () => ({
  taskOps: {
    getTasks: jest.fn(),
  },
}));

describe('useTaskPrefetching (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('prefetchTasksPage calls prefetchQuery with correct key and queryFn (AAA)', async () => {
    // Arrange
    const params = { page: 3, limit: 20 } as any;
    (taskOps.getTasks as jest.Mock).mockResolvedValue({ code: 200, data: {} });

    const prefetchSpy = jest
      .spyOn(queryClient, 'prefetchQuery')
      .mockImplementation(async (options: any) => {
        // Assert inside: key matches expected
        expect(options.queryKey).toEqual(taskKeys.list(params));
        // Act: run the provided query function
        await options.queryFn();
        return undefined as any;
      });

    const { prefetchTasksPage } = useTaskPrefetching();

    // Act
    await prefetchTasksPage(params);

    // Assert
    expect(prefetchSpy).toHaveBeenCalledTimes(1);
    expect(taskOps.getTasks).toHaveBeenCalledWith(params);
  });

  it('prefetchTasksPage builds different keys for different params (AAA)', async () => {
    // Arrange
    const params1 = { page: 1, limit: 10 } as any;
    const params2 = { page: 2, limit: 10 } as any;
    (taskOps.getTasks as jest.Mock).mockResolvedValue({ code: 200, data: {} });

    const seenKeys: any[] = [];
    jest.spyOn(queryClient, 'prefetchQuery').mockImplementation(async (options: any) => {
      seenKeys.push(options.queryKey);
      await options.queryFn();
      return undefined as any;
    });

    const { prefetchTasksPage } = useTaskPrefetching();

    // Act
    await prefetchTasksPage(params1);
    await prefetchTasksPage(params2);

    // Assert
    expect(seenKeys[0]).toEqual(taskKeys.list(params1));
    expect(seenKeys[1]).toEqual(taskKeys.list(params2));
    expect(seenKeys[0]).not.toBe(seenKeys[1]);
  });
});


