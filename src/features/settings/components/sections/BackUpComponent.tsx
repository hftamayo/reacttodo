import React, { useRef } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import { formStyles } from '@/shared/utils/twind/styles';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import { SettingsFormProps } from '@/shared/types/settings.type';

type BackUpProps = Pick<SettingsFormProps, 'labels'>;

export const BackUpComponent: React.FC<BackUpProps> = ({ labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formStyles.grouptitle} htmlFor="txtbackup">
        {labels.control01}
      </Label>
      <Input id="txtbackup" placeholder="todo" />
    </div>
  );
};
