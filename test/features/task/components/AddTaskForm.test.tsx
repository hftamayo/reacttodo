/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AddTaskForm } from '@/features/task/components/AddTaskForm';

// Mocks
const mockOnAddTask = jest.fn().mockResolvedValue(undefined);
jest.mock('@/features/task/hooks/composition/useTaskBoardActions', () => ({
  useTaskBoardActions: () => ({ onAddTask: mockOnAddTask }),
}));

const mockShowError = jest.fn();
jest.mock('@/shared/services/notification/notificationService', () => ({
  showError: (msg: string) => mockShowError(msg),
}));

jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => {
    if (key === 'addTaskButton') {
      return { text: 'Add Task' } as any;
    }
    if (key === 'errorComponent') {
      return { text: 'An error occurred' } as any;
    }
    if (key === 'addTaskForm') {
      return {
        group: {
          lblplaceholder: 'Enter task title',
          lblregister: 'Title is required',
          lblminLength: 'Title is too short',
        },
      } as any;
    }
    return { text: '' } as any;
  },
}));

// Controlled mock for react-hook-form to reliably trigger submit and error paths
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (onValid: Function, onInvalid?: Function) => () => {
      const shouldError = (global as any).__RHF_SHOULD_ERROR__;
      if (shouldError) {
        onInvalid && onInvalid({ message: 'Validation error' });
        return;
      }
      onValid({ title: 'Valid task title' });
    },
    reset: jest.fn(),
    formState: { errors: {} },
  }),
}));

describe('AddTaskForm (AAA)', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('renders form and controls with disabled state when isAddingTask=true (AAA)', () => {
    // Arrange
    const props = { isAddingTask: true };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(AddTaskForm, props), container);
    });

    // Assert
    const input = container.querySelector('input') as HTMLInputElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
  });

  it('submits with valid title and calls onAddTask with owner (AAA)', async () => {
    // Arrange
    const props = { isAddingTask: false };
    (global as any).__RHF_SHOULD_ERROR__ = false;
    await act(async () => {
      ReactDOM.render(React.createElement(AddTaskForm, props), container);
    });
    const form = container.querySelector('form') as HTMLFormElement;
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });

    // Assert
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    const firstArg = mockOnAddTask.mock.calls[0][0];
    expect(firstArg.title).toBe('Valid task title');
    expect(firstArg.owner).toBe(1);
    expect(mockShowError).not.toHaveBeenCalled();
  });

  it('shows validation error when title is empty (AAA)', async () => {
    // Arrange
    const props = { isAddingTask: false };
    (global as any).__RHF_SHOULD_ERROR__ = true;
    await act(async () => {
      ReactDOM.render(React.createElement(AddTaskForm, props), container);
    });
    const form = container.querySelector('form') as HTMLFormElement;
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });

    // Assert
    expect(mockOnAddTask).not.toHaveBeenCalled();
    expect(mockShowError).toHaveBeenCalled();
    const msg = mockShowError.mock.calls[0][0];
    expect(msg).toMatch(/Title is required|Validation error/);
  });
});


