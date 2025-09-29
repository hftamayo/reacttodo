/**
 * @jest-environment jsdom
 */

import { taskKeys } from '../../../../../src/features/task/hooks/core/queryKeys';

describe('taskKeys (AAA)', () => {
  it('all/tasks keys are consistent (AAA)', () => {
    // Arrange & Act
    const all = taskKeys.all;
    const tasks = taskKeys.tasks();

    // Assert
    expect(all).toEqual(['tasks']);
    expect(tasks).toEqual(['tasks']);
    expect(tasks).toBe(all); // same reference from tasks() implementation
  });

  it('lists/list create proper list keys with params (AAA)', () => {
    // Arrange
    const params = { page: 3, limit: 25 } as any;

    // Act
    const lists = taskKeys.lists();
    const list = taskKeys.list(params);

    // Assert
    expect(lists).toEqual(['tasks', 'list']);
    expect(list).toEqual(['tasks', 'list', { page: 3, limit: 25 }]);
  });

  it('details/detail create proper detail keys (AAA)', () => {
    // Arrange & Act
    const details = taskKeys.details();
    const detail = taskKeys.detail(7);

    // Assert
    expect(details).toEqual(['tasks', 'detail']);
    expect(detail).toEqual(['tasks', 'detail', 7]);
  });
});


