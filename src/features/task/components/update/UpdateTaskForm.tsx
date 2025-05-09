import { FC } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTaskUpdate } from '../../hooks/useTaskUpdate';
import { TaskCardFormProps } from '@/shared/types/task.type';

export const UpdateTaskForm: FC<TaskCardFormProps> = ({
  initialData,
  onCancel,
}) => {
  const { group } = useTranslation('updateTaskForm');
  const { register, errors, isSubmitting, handleFormSubmit } = useTaskUpdate({
    initialData,
    onSuccess: onCancel,
  });

  if (!group) {
    return null;
  }

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
          <div>
            <Input
              id="txttitle"
              className={formStyles.input}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <span className={formStyles.error}>{errors.title.message}</span>
            )}
          </div>
        </div>

        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtdescription">
            {group.lblTaskDescription}
          </Label>
          <Input
            id="txtdescription"
            className={formStyles.input}
            {...register('description')}
          />
        </div>

        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtdone">
            {group.lblTaskStatus}
          </Label>
          <Checkbox id="txtdone" {...register('done')} />
        </div>
      </div>

      <div className={formStyles.footer}>
        <button
          type="button"
          onClick={onCancel}
          className={formStyles.cancelButton}
        >
          {group.btnCancel}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={formStyles.submitButton}
        >
          {group.btnUpdate}
        </button>
      </div>
    </form>
  );
};
