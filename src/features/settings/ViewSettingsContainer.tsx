import React from 'react';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { ViewSettingsFormProps } from '@/shared/types/settings.type';
import { SettingsFormActions } from './components/layout/SettingsFormActions';
import { SettingsCard } from './components/layout/SettingsCard';
import { useSettingsForm } from './hooks/useSettingsForm';

export const ViewSettingsContainer: React.FC<ViewSettingsFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [formValues, handlers] = useSettingsForm({
    initialValues,
    onCancel,
    onSubmit,
  });
  const { title, text } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  return (
    <SettingsCard title={title} description={text}>
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

        <SettingsFormActions
          onCancel={cancelHandler}
          labels={{
            btncancel: group.btncancel,
            btnsave: group.btnsave,
          }}
        />
      </form>
    </SettingsCard>
  );
};
