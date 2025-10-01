/**
 * @jest-environment jsdom
 */

import { selectTaskUI, selectViewMode, selectSelectedTaskId } from '../../../../src/features/task/store/taskSelectors';
import { selectPage, selectLimit } from '../../../../src/features/task/store/taskSlice';

describe('task selectors (AAA)', () => {
  const makeState = (overrides?: Partial<any>) => ({
    taskUI: {
      selectedTaskId: 42,
      viewMode: 'grid',
      page: 3,
      limit: 20,
      ...overrides,
    },
  });

  it('selectTaskUI returns the taskUI slice (AAA)', () => {
    // Arrange
    const state = makeState();

    // Act
    const result = selectTaskUI(state as any);

    // Assert
    expect(result).toBe(state.taskUI);
  });

  it('selectViewMode returns view mode (AAA)', () => {
    // Arrange
    const state = makeState({ viewMode: 'list' });

    // Act
    const result = selectViewMode(state as any);

    // Assert
    expect(result).toBe('list');
  });

  it('selectSelectedTaskId returns selectedTaskId (AAA)', () => {
    // Arrange
    const state = makeState({ selectedTaskId: 7 });

    // Act
    const result = selectSelectedTaskId(state as any);

    // Assert
    expect(result).toBe(7);
  });

  it('selectPage/selectLimit return pagination values (AAA)', () => {
    // Arrange
    const state = makeState({ page: 5, limit: 50 });

    // Act
    const p = selectPage(state as any);
    const l = selectLimit(state as any);

    // Assert
    expect(p).toBe(5);
    expect(l).toBe(50);
  });
});





