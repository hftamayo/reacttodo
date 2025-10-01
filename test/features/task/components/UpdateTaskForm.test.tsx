/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { UpdateTaskForm } from '@/features/task/components/update/UpdateTaskForm';
import { TaskProps } from '@/shared/types/domains/task.type';

const initialTask: TaskProps = {
  id: 1,
  title: 'Original title',
  description: 'Original description',
  done: false,
  owner: 1,
};

// Mock translation
jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => {
    if (key === 'updateTaskForm') {
      return {
        group: {
          lblTaskTitle: 'Title',
          lblTaskDescription: 'Description',
          lblTaskStatus: 'Done',
          btnCancel: 'Cancel',
          btnUpdate: 'Update',
          btnUpdating: 'Updating...'
        },
      } as any;
    }
    return { text: '' } as any;
  },
}));

// Mock useTaskUpdateForm to control behavior and states
const mockHandleFormSubmit = jest.fn((e?: any) => e && e.preventDefault());
jest.mock('@/features/task/hooks/forms/useTaskUpdateForm', () => ({
  useTaskUpdateForm: () => ({
    register: jest.fn(() => ({})),
    errors: {},
    isSubmitting: false,
    handleFormSubmit: mockHandleFormSubmit,
  }),
}));

describe('UpdateTaskForm (AAA)', () => {
  let container: HTMLDivElement;
  const onCancel = jest.fn();
  const onUpdateTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  beforeAll(() => {
    // Fallback mock in case setup file isn't applied early enough
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).ResizeObserver = (global as any).ResizeObserver || class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('renders form fields and buttons (AAA)', () => {
    // Arrange
    const props = { initialData: initialTask, onCancel, onUpdateTask };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(UpdateTaskForm, props), container);
    });

    // Assert
    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector('input#txttitle')).toBeTruthy();
    expect(container.querySelector('input#txtdescription')).toBeTruthy();
    // Radix Checkbox renders a button role, not input
    expect(container.querySelector('#txtdone')).toBeTruthy();
    const cancelBtn = container.querySelector('button[type="button"]') as HTMLButtonElement;
    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(cancelBtn).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('disables controls when isUpdating=true (AAA)', () => {
    // Arrange
    const props = { initialData: initialTask, onCancel, onUpdateTask, isUpdating: true };

    // Act
    act(() => {
      ReactDOM.render(React.createElement(UpdateTaskForm, props), container);
    });

    // Assert
    expect((container.querySelector('#txttitle') as HTMLInputElement).disabled).toBe(true);
    expect((container.querySelector('#txtdescription') as HTMLInputElement).disabled).toBe(true);
    expect((container.querySelector('#txtdone') as HTMLInputElement).disabled).toBe(true);
    const cancelBtn = container.querySelector('button[type="button"]') as HTMLButtonElement;
    const submitBtn = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(cancelBtn.disabled).toBe(true);
    expect(submitBtn.disabled).toBe(true);
  });

  it('calls onCancel when cancel button clicked (AAA)', async () => {
    // Arrange
    const props = { initialData: initialTask, onCancel, onUpdateTask };
    act(() => {
      ReactDOM.render(React.createElement(UpdateTaskForm, props), container);
    });
    const cancelBtn = container.querySelector('button[type="button"]') as HTMLButtonElement;

    // Act
    expect(cancelBtn.getAttribute('type')).toBe('button');
    await act(async () => {
      cancelBtn.click();
      await Promise.resolve();
    });

    // Assert
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});


