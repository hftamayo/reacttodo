import { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { TaskCardProps } from '@/shared/types/domains/task.type';
import { UpdateTaskForm } from './UpdateTaskForm';
import { useTaskBoardMutations } from '@/features/task/hooks/core/useTaskBoardMutations';

export const UpdateTaskCard: FC<
  TaskCardProps & {
    isUpdating?: boolean;
  }
> = ({
  id,
  title,
  description,
  done,
  owner,
  onClose = () => {},
  isUpdating = false,
}) => {
  const { group } = useTranslation('updateTaskForm');
  const initialData = { id, title, description, done, owner };

  const { updateTask } = useTaskBoardMutations();

  const handleUpdateTask = async (taskData: typeof initialData) => {
    await updateTask.mutateAsync(taskData);
  };

  if (!group) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <CardTitle className={formStyles.title}>
              {group.cardTitle}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className={formStyles.closeButton}
            aria-label="Close Form"
            disabled={isUpdating}
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <UpdateTaskForm
          initialData={initialData}
          onCancel={onClose}
          onUpdateTask={handleUpdateTask}
          isUpdating={isUpdating}
        />
      </CardContent>
    </Card>
  );
};
