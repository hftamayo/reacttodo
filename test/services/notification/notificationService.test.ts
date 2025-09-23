/**
 * @jest-environment jsdom
 */

// Arrange: imports and mocks
import { showError, showSuccess } from '../../../src/shared/services/notification/notificationService';

// Mock sonner toast and styles
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../../../src/shared/utils/twind/styles', () => ({
  toasterMessages: {
    errorToaster: 'error-toast-class',
    successToaster: 'success-toast-class',
  },
}));

import { toast } from 'sonner';

describe('notificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('showError', () => {
    it('should show error toast for ApiError and log developer error (AAA)', () => {
      // Arrange
      const apiError = { code: 400, httpStatusCode: 400, resultMessage: 'Bad Request' };
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Act
      showError(apiError);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Developer Error:', '400 Bad Request');
      expect(toast.error).toHaveBeenCalledWith(
        'An error occurred. Please try again later.',
        { className: 'error-toast-class' }
      );
    });

    it('should show validation error toast for non-ApiError and log validation error (AAA)', () => {
      // Arrange
      const validationMessage = 'Form is invalid';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Act
      showError(validationMessage);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Validation Error:', validationMessage);
      expect(toast.error).toHaveBeenCalledWith(
        'Validation error. Please check your input and try again.',
        { className: 'error-toast-class' }
      );
    });

    it('should prefer custom user message when provided (AAA)', () => {
      // Arrange
      const apiError = { code: 500, resultMessage: 'Server Error' };

      // Act
      showError(apiError, 'Custom user friendly message');

      // Assert
      expect(toast.error).toHaveBeenCalledWith('Custom user friendly message', {
        className: 'error-toast-class',
      });
    });
  });

  describe('showSuccess', () => {
    it('should show success toast with provided message (AAA)', () => {
      // Arrange
      const message = 'Operation completed successfully';

      // Act
      showSuccess(message);

      // Assert
      expect(toast.success).toHaveBeenCalledWith(message, {
        className: 'success-toast-class',
      });
    });
  });
});


