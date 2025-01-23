import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/forms/card';
import { Button } from '@/shared/components/ui/forms/button';
import { Input } from '@/shared/components/ui/forms/input';
import { Label } from '@/shared/components/ui/forms/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/forms/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/forms/select';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { ViewSettingsFormProps } from '@/shared/types/ui.type';

const ViewSettingsForm: React.FC<ViewSettingsFormProps> = ({ onCancel }) => {
  const { title, text } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  const cancelHandler = () => {
    onCancel();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{text}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>{group.lbllanguage}</Label>
              <RadioGroup>
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="timezone">{group.lbltimezone}</Label>
              <Select>
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

            <div className="flex flex-col space-y-1.5">
              <Label>{group.lbltheme}</Label>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="r1" />
                  <Label htmlFor="r1">{group.theme01}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="r2" />
                  <Label htmlFor="r2">{group.theme02}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fontsize">{group.lblfsize}</Label>
              <Select>
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="txtbackup">Backup and Restore</Label>
              <Input id="txtbackup" placeholder="todo" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button variant="additive">Save</Button>
      </CardFooter>
    </Card>
  );
};

export default ViewSettingsForm;
