import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
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
  mutations,
}) => {
  const { group } = useTranslation('updateTaskCard');

  if (!group) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={formSettingsStyles.title}>
              {group.cardTitle}
            </CardTitle>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={formSettingsStyles.closeButton}
              aria-label="Close Form"
            >
              <FaTimes className={formSettingsStyles.closeIcon} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <UpdateTaskForm
          id={id}
          title={title}
          description={description}
          done={done}
          owner={owner}
          mutations={mutations}
          onClose={onClose}
        />
      </CardContent>
    </Card>
  );
};
