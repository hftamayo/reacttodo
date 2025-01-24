import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { Button } from '@/shared/components/ui/button/Button';
import { Input } from '@/shared/components/ui/input/Input';
import { Label } from '@/shared/components/ui/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui/rgroup/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select/Select';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { ViewSettingsFormProps } from '@/shared/types/ui.type';
import { formSettingsStyles } from '@/shared/utils/twind/styles';

const ViewSettingsForm: React.FC<ViewSettingsFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const { title, text } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  const cancelHandler = () => {
    onCancel();
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={formSettingsStyles.title}>{title}</CardTitle>
        <CardDescription className={formSettingsStyles.description}>
          {text}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <div className="flex flex-col space-y-1.5">
                  <Label className={formSettingsStyles.grouptitle}>
                    {group.lbllanguage}
                  </Label>
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
                <div className="my-4"></div>

                <div className="flex flex-col space-y-1.5">
                  <Label className={formSettingsStyles.grouptitle}>
                    {group.lbltheme}
                  </Label>
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
              </div>

              <div className="w-full md:w-1/2 px-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className={formSettingsStyles.grouptitle}
                    htmlFor="timezone"
                  >
                    {group.lbltimezone}
                  </Label>
                  <Select defaultValue={initialValues.timezone}>
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
                <div className="my-4"></div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    className={formSettingsStyles.grouptitle}
                    htmlFor="fontsize"
                  >
                    {group.lblfsize}
                  </Label>
                  <Select defaultValue={initialValues.fontSize}>
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
                <div className="my-4"></div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    className={formSettingsStyles.grouptitle}
                    htmlFor="txtbackup"
                  >
                    Backup and Restore
                  </Label>
                  <Input id="txtbackup" placeholder="todo" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button variant="destructive" onClick={cancelHandler}>
          {group.btncancel}
        </Button>
        <Button variant="additive" type="submit">
          {group.btnsave}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ViewSettingsForm;
