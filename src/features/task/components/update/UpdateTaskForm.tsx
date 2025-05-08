import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { showError } from '@/shared/services/notification/notificationService';
import { TaskProps } from '@/shared/types/api.type';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { useTaskMutations } from '../../hooks/useTaskMutations';

interface UpdateTaskCardProps extends TaskProps {
  onClose: () => void;
  mutations: ReturnType<typeof useTaskMutations>;
}

export const UpdateTaskForm: FC<UpdateTaskCardProps> = ({
  id,
  title,
  description,
  done,
  owner,
  mutations,
  onClose,
}) => {
  const { group } = useTranslation('updateTaskCard');
  const { updateTask } = mutations;

  if (!group) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskProps>({
    defaultValues: {
      id,
      title,
      description,
      done,
      owner,
    },
  });

  const onSubmit: SubmitHandler<TaskProps> = async (data) => {
    try {
      await updateTask.mutateAsync(data);
      onClose();
    } catch (error) {
      showError('Failed to update task');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={taskBoard.form}
      aria-label="Add new task"
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label className={formSettingsStyles.grouptitle} htmlFor="txttitle">
            {group.lblTaskTitle}
          </Label>
          <Input
            id="txttitle"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            className={formSettingsStyles.grouptitle}
            htmlFor="txtdescription"
          >
            {group.lblTaskDescription}
          </Label>
          <Input id="txtdescription" {...register('description')} />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Checkbox id="txtdone" {...register('done')} />
          <label
            htmlFor="txtdone"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {group.lblTaskStatus}
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className={formSettingsStyles.cancelButton}
          >
            {group.btnCancel}
          </button>
          <button
            type="submit"
            disabled={updateTask.isPending}
            className={formSettingsStyles.submitButton}
          >
            {group.btnUpdate}
          </button>
        </div>
      </div>
    </form>
  );
};
