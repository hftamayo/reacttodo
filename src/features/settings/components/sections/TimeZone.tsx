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
import { SettingsControlsProps } from '@/shared/types/settings.type';

export const TimeZone: React.FC<SettingsControlsProps<string>> = ({
  value,
  onChange,
  labels,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle} htmlFor="timezone">
        {group.lbltimezone}
      </Label>
      <Select value={formValues.timezone} onValueChange={handleTimeZoneChange}>
        <SelectTrigger id="timezone">
          <SelectValue placeholder={group.tzpholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="tz1">TimeZone 1</SelectItem>
          <SelectItem value="tz2">TimeZone 2</SelectItem>
          <SelectItem value="tz3">TimeZone 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
