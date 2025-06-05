import React from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select/Select';
import { formStyles } from '@/shared/utils/twind/styles';
import { SettingsFormSpecialControlsProps } from '@/shared/types/settings.type';

export const FontSizeComponent: React.FC<
  SettingsFormSpecialControlsProps<string>
> = ({ value, onChange, labels }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className={formStyles.grouptitle} htmlFor="fontsize">
        {labels.title}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="fontsize">
          <SelectValue
            placeholder={
              Array.isArray(labels.options)
                ? labels.options.join(', ')
                : String(labels.options)
            }
          />
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
