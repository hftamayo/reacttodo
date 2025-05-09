import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { TaskCardProps } from '@/shared/types/task.type';
import { UpdateTaskForm } from './UpdateTaskForm';

export const UpdateTaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  done,
  owner,
  onClose,
}) => {
  const { group } = useTranslation('updateTaskCard');

  if (!group) {
    return null;
  }

  const initialData = { id, title, description, done, owner };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={formStyles.title}>
              {group.cardTitle}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className={formStyles.closeButton}
            aria-label="Close Form"
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <UpdateTaskForm initialData={initialData} onCancel={handleClose} />
      </CardContent>
    </Card>
  );
};
