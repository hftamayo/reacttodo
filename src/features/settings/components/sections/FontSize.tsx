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

export const FontSize: React.FC<SettingsControlsProps<string>> = ({
  value,
  onChange,
  labels,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formSettingsStyles.grouptitle} htmlFor="fontsize">
        {group.lblfsize}
      </Label>
      <Select defaultValue={initialValues.fontSize.toString()}>
        <SelectTrigger id="fontsize">
          <SelectValue placeholder={group.fsizepholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="18">18</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
