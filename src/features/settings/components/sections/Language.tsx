import React from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/rgroup/RadioGroup';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { SettingsControlsProps } from '@/shared/types/settings.type';

export const Language: React.FC<SettingsControlsProps<string>> = ({
  value,
  onChange,
  labels,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle}>
        {group.lbllanguage}
      </Label>
      <RadioGroup
        value={formValues.language}
        onValueChange={handleLanguageChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="r1" />
          <Label htmlFor="r1">English</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="es" id="r2" />
          <Label htmlFor="r2">Espanol</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="de" id="r3" />
          <Label htmlFor="r3">Deutsch</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
