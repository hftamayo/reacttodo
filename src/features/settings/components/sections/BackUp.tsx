import React, { useRef } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import {
  showSuccess,
  showError,
} from '@/shared/services/notification/notificationService';
import { SettingsFormLabelProps } from '@/shared/types/settings.type';

export const BackUp: React.FC<SettingsFormLabelProps> = ({ labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle} htmlFor="txtbackup">
        {labels.control01}
      </Label>
      <Input id="txtbackup" placeholder="todo" />
    </div>
  );
};
