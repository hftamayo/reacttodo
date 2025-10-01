/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useTaskUpdateForm } from '../../../../../src/features/task/hooks/forms/useTaskUpdateForm';

// Mocks
const mockShowSuccess = jest.fn();
jest.mock('../../../../../src/shared/services/notification/notificationService', () => ({
  showSuccess: (...args: any[]) => mockShowSuccess(...args),
}));

const mockUseForm = jest.fn();
jest.mock('react-hook-form', () => ({
  useForm: (...args: any[]) => mockUseForm(...args),
}));

describe('useTaskUpdateForm (AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialData = {
    id: 1,
    title: 'Old',
    description: 'Desc',
    done: false,
    owner: 'user1',
  } as any;

  const TestHost: React.FC<{
    hookProps: any;
    onReady: (h: any) => void;
  }> = ({ hookProps, onReady }) => {
    const h = useTaskUpdateForm(hookProps);
    React.useEffect(() => {
      onReady(h);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [h]);
    return null;
  };

  it('submits changed fields, calls onUpdateTask, showSuccess and onSuccess (AAA)', async () => {
    // Arrange
    const dirtyFields = { title: true, done: true } as any;
    const submitData = { title: 'New', description: undefined, done: true } as any;

    mockUseForm.mockReturnValue({
      register: jest.fn(),
      reset: jest.fn(),
      handleSubmit: (cb: any) => async (_evt?: any) => cb(submitData),
      formState: { errors: {}, dirtyFields, isDirty: true },
    });

    const onUpdateTask = jest.fn().mockResolvedValue({});
    const onSuccess = jest.fn();

    let hookRef: any;
    await act(async () => {
      render(
        React.createElement(TestHost, {
          hookProps: { initialData, onSuccess, onUpdateTask },
          onReady: (h: any) => {
            hookRef = h;
          },
        })
      );
    });

    // Act
    let result: any;
    await act(async () => {
      result = await hookRef.handleFormSubmit();
    });

    // Assert
    expect(onUpdateTask).toHaveBeenCalledWith({
      id: 1,
      title: 'New',
      description: 'Desc',
      done: true,
      owner: 'user1',
    });
    expect(mockShowSuccess).toHaveBeenCalledWith('Task updated successfully');
    expect(onSuccess).toHaveBeenCalled();
    expect(result).toBe(true);
    expect(hookRef.isDirty).toBe(true);
    expect(hookRef.errors).toEqual({});
  });

  it('returns false and logs error when onUpdateTask fails (AAA)', async () => {
    // Arrange
    const dirtyFields = { title: true } as any;
    const submitData = { title: 'New' } as any;

    mockUseForm.mockReturnValue({
      register: jest.fn(),
      reset: jest.fn(),
      handleSubmit: (cb: any) => async (_evt?: any) => cb(submitData),
      formState: { errors: {}, dirtyFields, isDirty: true },
    });

    const onUpdateTask = jest.fn().mockRejectedValue(new Error('boom'));
    const onSuccess = jest.fn();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    let hookRef: any;
    await act(async () => {
      render(
        React.createElement(TestHost, {
          hookProps: { initialData, onSuccess, onUpdateTask },
          onReady: (h: any) => {
            hookRef = h;
          },
        })
      );
    });

    // Act
    let result: any;
    await act(async () => {
      result = await hookRef.handleFormSubmit();
    });

    // Assert
    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    expect(mockShowSuccess).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});





