import React from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/rgroup/RadioGroup';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { SettingsFormSpecialControlsProps } from '@/shared/types/settings.type';

export const ThemeComponent: React.FC<
  SettingsFormSpecialControlsProps<string>
> = ({ value, onChange, labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle}>{labels.title}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {Object.entries(labels.options ?? {}).map(([key, label]) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem value={key} id={`theme-${key}`} />
            <Label htmlFor={`theme-${key}`}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
