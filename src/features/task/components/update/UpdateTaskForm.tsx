import { FC } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTaskUpdate } from '../../hooks/core/useTaskUpdate';
import { TaskUpdateProps } from '@/shared/types/domains/task.type';

export const UpdateTaskForm: FC<TaskUpdateProps & { isUpdating?: boolean }> = ({
  initialData,
  onCancel,
  onUpdateTask,
  isUpdating = false,
}) => {
  const { group } = useTranslation('updateTaskForm');
  const { register, errors, isSubmitting, handleFormSubmit } = useTaskUpdate({
    initialData,
    onSuccess: onCancel,
    onUpdateTask,
  });

  if (!group) {
    return null;
  }

  const isDisabled = isSubmitting || isUpdating;

  return (
    <form
      onSubmit={handleFormSubmit}
      className={formStyles.form}
      aria-label="Update task"
    >
      <div className={formStyles.formGrid}>
        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txttitle">
            {group.lblTaskTitle}
          </Label>
          <Input
            id="txttitle"
            className={formStyles.input}
            {...register('title', { required: 'Title is required' })}
            disabled={isDisabled}
          />
          {errors.title && (
            <span className={formStyles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtdescription">
            {group.lblTaskDescription}
          </Label>
          <Input
            id="txtdescription"
            className={formStyles.input}
            {...register('description')}
            disabled={isDisabled}
          />
        </div>

        <div className={formStyles.formRow}>
          <div className="flex items-center gap-2">
            <Label className={formStyles.label} htmlFor="txtdone">
              {group.lblTaskStatus}
            </Label>
            <Checkbox
              id="txtdone"
              {...register('done')}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      <div className={formStyles.footer}>
        <button
          type="button"
          onClick={onCancel}
          className={formStyles.cancelButton}
          disabled={isDisabled}
        >
          {group.btnCancel}
        </button>
        <button
          type="submit"
          disabled={isDisabled}
          className={formStyles.submitButton}
        >
          {isDisabled ? group.btnUpdating || 'Updating...' : group.btnUpdate}
        </button>
      </div>
    </form>
  );
};
