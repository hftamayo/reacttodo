import React from 'react';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { ViewSettingsFormProps } from '@/shared/types/settings.type';
import { SettingsFormActions } from './components/layout/SettingsFormActions';
import { SettingsCard } from './components/layout/SettingsCard';
import { useSettingsForm } from './hooks/useSettingsForm';
import { Language } from './components/sections/Language';
import { Theme } from './components/sections/Theme';
import { TimeZone } from './components/sections/TimeZone';
import { FontSize } from './components/sections/FontSize';
import { BackUp } from './components/sections/BackUp';

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
              <Language
                value={formValues.language}
                onChange={(value) =>
                  handlers.handleSettingChange('language', value)
                }
                labels={{
                  lbllanguage: group.lbllanguage,
                }}
              />
              <div className="my-4"></div>

              <Theme
                value={formValues.theme}
                onChange={(value) =>
                  handlers.handleSettingChange('theme', value)
                }
                labels={{
                  lbltheme: group.lbltheme,
                  theme01: group.theme01,
                  theme02: group.theme02,
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
                  lbltimezone: group.lbltimezone,
                  tzpholder: group.tzpholder,
                }}
              />
              <div className="my-4"></div>
              <FontSize
                value={formValues.fontSize}
                onChange={(value) =>
                  handlers.handleSettingChange('fontSize', value)
                }
                labels={{
                  lblfsize: group.lblfsize,
                  fsizepholder: group.fsizepholder,
                }}
              />

              <div className="my-4"></div>
              <BackUp
                value={formValues.backup}
                onChange={(value) =>
                  handlers.handleSettingChange('backup', value)
                }
                labels={{
                  lblbackup: group.lblbackup,
                }}
              />
            </div>
          </div>
        </div>

        <SettingsFormActions
          onCancel={handlers.cancelHandler}
          labels={{
            btncancel: group.btncancel,
            btnsave: group.btnsave,
          }}
        />
      </form>
    </SettingsCard>
  );
};
