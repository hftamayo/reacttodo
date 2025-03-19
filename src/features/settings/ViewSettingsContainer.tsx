import React from 'react';
import { SettingsFormActions } from './components/layout/SettingsFormActions';
import { SettingsCard } from './components/layout/SettingsCard';
import { useSettingsForm } from './hooks/useSettingsForm';
import { LanguageComponent } from './components/sections/LanguageComponent';
import { ThemeComponent } from './components/sections/ThemeComponent';
import { TimeZone } from './components/sections/TimeZone';
import { FontSize } from './components/sections/FontSize';
import { BackUp } from './components/sections/BackUp';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import {
  Language,
  Theme,
  SettingsFormProps,
} from '@/shared/types/settings.type';

export const ViewSettingsContainer: React.FC<SettingsFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const { formValues, handlers } = useSettingsForm({
    initialValues,
    onCancel,
    onSubmit,
    labels: {
      control01: '',
      control02: '',
    },
  });
  const { title = '', text = '' } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  return (
    <SettingsCard title={title} description={text}>
      <form onSubmit={handlers.submitHandler}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <LanguageComponent
                value={formValues.language}
                onChange={(value) =>
                  handlers.handleSettingChange('language', value as Language)
                }
                labels={{
                  title: group.lbllanguage,
                }}
              />
              <div className="my-4"></div>

              <ThemeComponent
                value={formValues.theme}
                onChange={(value) =>
                  handlers.handleSettingChange('theme', value as Theme)
                }
                labels={{
                  title: group.lbltheme,
                  options: {
                    light: group.theme01,
                    dark: group.theme02,
                  },
                }}
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <TimeZone
                value={formValues.timezone}
                onChange={(value) =>
                  handlers.handleSettingChange('timezone', value)
                }
                labels={{
                  title: group.lbltimezone,
                  options: { placeholder: group.tzpholder },
                }}
              />
              <div className="my-4"></div>
              <FontSize
                value={formValues.fontSize}
                onChange={(value) =>
                  handlers.handleSettingChange('fontSize', value)
                }
                labels={{
                  title: group.lblfsize,
                  options: { placeholder: group.fsizepholder },
                }}
              />

              <div className="my-4"></div>
              <BackUp
                labels={{
                  control01: group.lblbackup,
                }}
              />
            </div>
          </div>
        </div>

        <SettingsFormActions
          onCancel={handlers.cancelHandler}
          onSubmit={() => onSubmit(formValues)}
          labels={{
            control01: group.btncancel,
            control02: group.btnsave,
          }}
        />
      </form>
    </SettingsCard>
  );
};
