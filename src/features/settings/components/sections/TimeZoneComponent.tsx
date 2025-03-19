import React from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select/Select';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { SettingsFormSpecialControlsProps } from '@/shared/types/settings.type';

export const TimeZoneComponent: React.FC<
  SettingsFormSpecialControlsProps<string>
> = ({ value, onChange, labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle} htmlFor="timezone">
        {labels.title}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="timezone">
          <SelectValue placeholder={labels.options?.toString()} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="tz1">CST</SelectItem>
          <SelectItem value="tz2">EST</SelectItem>
          <SelectItem value="tz3">PST</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
