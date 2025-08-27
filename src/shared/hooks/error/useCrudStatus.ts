import { useCallback } from 'react';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import { useErrorHandler } from '../useErrorHandler';
import { CrudOperation, EntityType } from '@/shared/types/api.type';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const useCrudStatus = (entityType: EntityType) => {
  const { handleError: errorHandlerFn } = useErrorHandler(entityType);
  const { group } = useTranslation('crudOperations');

  const getDefaultMessages = useCallback(
    (operation: CrudOperation, status: 'success' | 'error') => {
      if (!group) {
        return status === 'success'
          ? 'operation successful'
          : 'operation failed';
      }

      const messages = {
        create: {
          success: group.createSuccess || 'created successfully',
          error: group.createError || 'creation failed',
        },
        read: {
          success: group.readSuccess || 'loaded successfully',
          error: group.readError || 'loading failed',
        },
        update: {
          success: group.updateSuccess || 'updated successfully',
          error: group.updateError || 'update failed',
        },
        delete: {
          success: group.deleteSuccess || 'deleted successfully',
          error: group.deleteError || 'deletion failed',
        },
        toggle: {
          success: group.toggleSuccess || 'toggled successfully',
          error: group.toggleError || 'toggle failed',
        },
      };

      return messages[operation]?.[status] || `${status}`;
    },
    [group]
  );

  const getOperationMessage = useCallback(
    (
      operation: CrudOperation,
      status: 'success' | 'error',
      customMessages?: string
    ): string => {
      if (customMessages) return customMessages;

      const entity = entityType.charAt(0).toUpperCase() + entityType.slice(1);
      const baseMessage = getDefaultMessages(operation, status);

      return `${entity} ${baseMessage}`;
    },
    [entityType, getDefaultMessages]
  );

  const handleSuccess = useCallback(
    (operation: CrudOperation, customMessages?: string) => {
      const message = getOperationMessage(operation, 'success', customMessages);
      showSuccess(message);

      console.debug(`${operation} operation succeeded for ${entityType}`);
    },
    [getOperationMessage, entityType]
  );

  const handleError = useCallback(
    (operation: CrudOperation, error: Error, customMessage?: string) => {
      // Log the error
      console.error(`${operation} operation failed for ${entityType}:`, error);

      // Show user-friendly notification
      const message = getOperationMessage(operation, 'error', customMessage);
      showError(message);

      // Pass to global error handler for consistent processing
      errorHandlerFn(error, {
        componentStack: error.stack ?? '',
      });

      // Could add error reporting to monitoring service here
    },
    [getOperationMessage, entityType, errorHandlerFn]
  );

  return { handleSuccess, handleError };
};
