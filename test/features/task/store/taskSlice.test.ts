/**
 * @jest-environment jsdom
 */

import reducer, { setSelectedTask, setViewMode, setPage, setLimit } from '../../../../src/features/task/store/taskSlice';

describe('taskSlice reducer (AAA)', () => {
  const initialState = {
    selectedTaskId: null,
    viewMode: 'list',
    page: 1,
    limit: 5,
  } as any;

  it('returns initial state when passed an empty action (AAA)', () => {
    // Arrange
    const state = undefined;

    // Act
    const next = reducer(state, { type: '' } as any);

    // Assert
    expect(next).toEqual(initialState);
  });

  it('setSelectedTask updates selectedTaskId (AAA)', () => {
    // Arrange
    const state = initialState;

    // Act
    const next = reducer(state, setSelectedTask(7));

    // Assert
    expect(next.selectedTaskId).toBe(7);
  });

  it('setViewMode updates viewMode (AAA)', () => {
    // Arrange
    const state = initialState;

    // Act
    const next = reducer(state, setViewMode('grid'));

    // Assert
    expect(next.viewMode).toBe('grid');
  });

  it('setPage updates page (AAA)', () => {
    // Arrange
    const state = initialState;

    // Act
    const next = reducer(state, setPage(3));

    // Assert
    expect(next.page).toBe(3);
  });

  it('setLimit updates limit (AAA)', () => {
    // Arrange
    const state = initialState;

    // Act
    const next = reducer(state, setLimit(25));

    // Assert
    expect(next.limit).toBe(25);
  });
});


