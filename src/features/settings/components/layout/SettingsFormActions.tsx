import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { CardFooter } from '@/shared/components/ui/card/Card';
import { SettingsFormProps } from '@/shared/types/settings/settings.type';

export const SettingsFormActions: React.FC<SettingsFormProps> = ({
  onCancel,
  onSubmit,
  labels,
}) => {
  return (
    <CardFooter className="flex justify-center space-x-4">
      <Button variant="destructive" onClick={onCancel}>
        {labels.control01}
      </Button>
      <Button variant="additive" type="submit">
        {labels.control02}
      </Button>
    </CardFooter>
  );
};
