import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { FaTimes } from 'react-icons/fa';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { TaskCardProps } from '@/shared/types/task.type';

export const UpdateTaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  done,
  onClose,
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                className={formSettingsStyles.grouptitle}
                htmlFor="txttitle"
              >
                {group.lblTaskTitle}
              </Label>
              <Input id="txttitle" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                className={formSettingsStyles.grouptitle}
                htmlFor="txtdescription"
              >
                {group.lblTaskDescription}
              </Label>
              <Input id="txtdescription" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Checkbox id="txtdone" />
              <label
                htmlFor="txtdone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {group.lblTaskStatus}
              </label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
