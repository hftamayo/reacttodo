import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { CardFooter } from '@/shared/components/ui/card/Card';
import { SettingsFormControlsProps } from '@/shared/types/settings.type';

export const SettingsFormActions: React.FC<SettingsFormControlsProps> = ({
  onCancel,
  onSave,
  labels,
}) => {
  return (
    <CardFooter className="flex justify-center space-x-4">
      <Button variant="destructive" onClick={onCancel}>
        {labels.control01}
      </Button>
      <Button variant="additive" type="submit" onClick={onSave}>
        {labels.control02}
      </Button>
    </CardFooter>
  );
};
