import React, { useState } from 'react';
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
import { useSettings } from './hooks/useSettings';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import {
  ViewSettingsFormProps,
  Language,
  Theme,
} from '@/shared/types/settings.type';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { showError } from '@/shared/services/notification/notificationService';

export const ViewSettingsContainer: React.FC<ViewSettingsFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState({
    language: initialValues.language,
    theme: initialValues.theme,
    timezone: initialValues.timezone,
    fontSize: initialValues.fontSize,
  });

  const { settings, updateSettings } = useSettings();
  const { title, text } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  const handleLanguageChange = (value: Language) => {
    setFormValues((prev) => ({ ...prev, language: value }));
  };

  const handleThemeChange = (value: Theme) => {
    setFormValues((prev) => ({ ...prev, theme: value }));
  };

  const handleTimeZoneChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, timezone: value }));
  };

  const handleFontSizeChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, fontSize: Number(value) }));
  };

  const cancelHandler = () => {
    onCancel();
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      updateSettings(formValues);
      onSubmit(formValues);
    } catch (error) {
      showError('Failed to update settings');
      //console.log(error);
    }
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
                <Language
                  value={formValues.language}
                  onChange={handleLanguageChange}
                  labels={{
                    title: group.lbllanguage,
                    options: group.languages,
                  }}
                />
                <div className="my-4"></div>

                <Theme
                  value={formValues.theme}
                  onChange={handleThemeChange}
                  labels={{
                    title: group.lbltheme,
                    options: group.themes,
                  }}
                />
              </div>

              <div className="w-full md:w-1/2 px-2">
                <TimeZone
                  value={formValues.timezone}
                  onChange={handleTimeZoneChange}
                  labels={{
                    title: group.lbltimezone,
                    options: group.timezones,
                  }}
                />
                <div className="my-4"></div>
                <FontSize
                  value={formValues.fontSize}
                  onChange={handleFontSizeChange}
                  labels={{
                    title: group.lblfontsize,
                    options: group.fontsizes,
                  }}
                />

                <div className="my-4"></div>
                <BackUp
                  value={formValues.backup}
                  onChange={handleBackUpChange}
                  labels={{
                    title: group.lblbackup,
                    options: group.backups,
                  }}
                />
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
