import { useCallback } from 'react';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import { useErrorHandler } from '../useErrorHandler';
import {
  CrudOperation,
  EntityType,
  OperationMessages,
} from '@/shared/types/api.type';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const useCrudStatus = (entityType: EntityType) => {
  const { handleError: errorHandlerFn } = useErrorHandler(entityType);
  const { group } = useTranslation('crudStatus');

  if (!group) {
    return null;
  }

  const defaultMessages: Record<CrudOperation, OperationMessages> = {
    create: {
      success: group.createSuccess,
      error: group.createError,
    },
    read: {
      success: group.readSuccess,
      error: group.readError,
    },
    update: {
      success: group.updateSuccess,
      error: group.updateError,
    },
    delete: {
      success: group.deleteSuccess,
      error: group.deleteError,
    },
    toggle: {
      success: group.toggleSuccess,
      error: group.toggleError,
    },
  };

  const getOperationMessage = useCallback(
    (
      operation: CrudOperation,
      status: 'success' | 'error',
      customMessages?: string
    ): string => {
      if (customMessages) return customMessages;

      const entity = entityType.charAt(0).toUpperCase() + entityType.slice(1);
      const baseMessage = defaultMessages[operation][status];

      return `${entity} ${baseMessage}`;
    },
    [entityType, defaultMessages]
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
