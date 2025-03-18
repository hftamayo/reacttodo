import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { CardFooter } from '@/shared/components/ui/card/Card';
import { SettingsFormProps } from '@/shared/types/settings.type';

export const SettingsFormActions: React.FC<SettingsFormProps> = ({
  onCancel,
  onSubmit,
  labels,
}) => {
  return (
    <CardFooter className="flex justify-center space-x-4">
      <Button variant="destructive" onClick={onCancel}>
        {labels.labels.control01}
      </Button>
      <Button variant="additive" type="submit">
        {labels.labels.control01}
      </Button>
    </CardFooter>
  );
};
