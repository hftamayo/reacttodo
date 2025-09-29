/**
 * @jest-environment jsdom
 */

import { queryClient } from '../../../src/shared/services/cache/queryClient';

describe('queryClient (AAA)', () => {
  it('creates a QueryClient instance (AAA)', () => {
    // Arrange
    // (nothing to arrange)

    // Act
    const instance = queryClient;

    // Assert
    expect(instance).toBeDefined();
    expect(typeof instance).toBe('object');
  });

  it('sets default query options as expected (AAA)', () => {
    // Arrange
    const defaults = queryClient.getDefaultOptions();

    // Act
    const q = defaults.queries ?? {};

    // Assert
    expect(q.staleTime).toBe(0); // force data refetch
    expect(q.gcTime).toBe(10 * 60 * 1000); // 10 minutes
    expect(q.retry).toBe(1);
    expect(q.refetchOnWindowFocus).toBe(false);
  });
});


