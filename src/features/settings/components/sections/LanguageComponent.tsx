import React from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/rgroup/RadioGroup';
import { formStyles } from '@/shared/utils/twind/styles';
import { SettingsFormSpecialControlsProps } from '@/shared/types/settings/settings.type';

export const LanguageComponent: React.FC<
  SettingsFormSpecialControlsProps<string>
> = ({ value, onChange, labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formStyles.grouptitle}>{labels.title}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
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
