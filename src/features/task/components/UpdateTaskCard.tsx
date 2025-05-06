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
import { TaskCardProps } from '@/shared/types/task.type';

export const UpdateTaskCard: React.FC<TaskCardProps> = ({
  cardTitle,
  title,
  description,
  done,
  onClose,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={formSettingsStyles.title}>
              {cardTitle}
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
                {labels.control01}
              </Label>
              <Input id="txttitle" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                className={formSettingsStyles.grouptitle}
                htmlFor="txtdescription"
              >
                {labels.control01}
              </Label>
              <Input id="txtdescription" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Checkbox id="txtdone" />
              <label
                htmlFor="txtdone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Task status
              </label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
