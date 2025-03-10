import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';
import { CardFooter } from '@/shared/components/ui/card/Card';
import { SettingsFormActionsProps } from '@/shared/types/settings.type';

export const SettingsFormActions: React.FC<SettingsFormActionsProps> = ({
  onCancel,
  labels,
}) => {
  return (
    <CardFooter className="flex justify-center space-x-4">
      <Button variant="destructive" onClick={onCancel}>
        {labels.btncancel}
      </Button>
      <Button variant="additive" type="submit">
        {labels.btnsave}
      </Button>
    </CardFooter>
  );
};
