/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { TaskBoardStats } from '@/features/task/components/TaskBoardStats';

describe('TaskBoardStats (AAA)', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('renders nothing when total <= 0 (AAA)', () => {
    // Arrange
    const props = { total: 0, completed: 0, remaining: 0, lastUpdated: '2025-10-01T00:00:00.000Z' };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(TaskBoardStats, props), container);
    });

    // Assert
    expect(container.innerHTML).toBe('');
  });

  it('renders stats when total > 0 (AAA)', () => {
    // Arrange
    const props = { total: 10, completed: 4, remaining: 6, lastUpdated: '2025-10-01T00:00:00.000Z' };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(TaskBoardStats, props), container);
    });

    // Assert
    expect(container.textContent).toContain('Total:');
    expect(container.textContent).toContain('Completed:');
    expect(container.textContent).toContain('Remaining:');
    expect(container.textContent).toContain('10');
    expect(container.textContent).toContain('4');
    expect(container.textContent).toContain('6');
  });

  it('applies base styling container (AAA)', () => {
    // Arrange
    const props = { total: 3, completed: 1, remaining: 2, lastUpdated: '2025-10-01T00:00:00.000Z' };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(TaskBoardStats, props), container);
    });

    // Assert
    const wrapper = container.querySelector('div');
    expect(wrapper).not.toBeNull();
    // Tailwind classes used by the component
    expect(wrapper?.className).toMatch(/bg-gray-50/);
    expect(wrapper?.className).toMatch(/rounded-lg/);
  });
});


