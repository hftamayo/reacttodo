import React from 'react';
import { SettingsFormActions } from '../../features/settings/components/layout/SettingsFormActions';
import { SettingsCard } from '../../features/settings/components/layout/SettingsCard';
import { LanguageComponent } from '../../features/settings/components/sections/LanguageComponent';
import { ThemeComponent } from '../../features/settings/components/sections/ThemeComponent';
import { TimeZoneComponent } from '../../features/settings/components/sections/TimeZoneComponent';
import { FontSizeComponent } from '../../features/settings/components/sections/FontSizeComponent';
import { BackUpComponent } from '../../features/settings/components/sections/BackUpComponent';
import {
  Language,
  Theme,
  SettingsPresenterProps,
} from '@/shared/types/settings.type';

export const SettingsPresenter: React.FC<SettingsPresenterProps> = ({
  title,
  description,
  formValues,
  labels,
  handlers,
  onSubmit,
  onCancel,
}) => (
  <SettingsCard title={title} description={description} onClose={onCancel}>
    <form onSubmit={handlers.submitHandler}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <LanguageComponent
              value={formValues.language}
              onChange={(value) =>
                handlers.handleSettingChange('language', value as Language)
              }
              labels={{ title: labels.language }}
            />
            <div className="my-4" />
            <ThemeComponent
              value={formValues.theme}
              onChange={(value) =>
                handlers.handleSettingChange('theme', value as Theme)
              }
              labels={{
                title: labels.theme,
                options: {
                  light: labels.themeLight,
                  dark: labels.themeDark,
                },
              }}
            />
          </div>

          <div className="w-full md:w-1/2 px-2">
            <TimeZoneComponent
              value={formValues.timezone}
              onChange={(value) =>
                handlers.handleSettingChange('timezone', value)
              }
              labels={{
                title: labels.timezone,
                options: { placeholder: labels.timezonePlaceholder },
              }}
            />
            <div className="my-4" />
            <FontSizeComponent
              value={formValues.fontSize}
              onChange={(value) =>
                handlers.handleSettingChange('fontSize', value)
              }
              labels={{
                title: labels.fontSize,
                options: { placeholder: labels.fontSizePlaceholder },
              }}
            />
            <div className="my-4" />
            <BackUpComponent
              labels={{
                control01: labels.backup,
              }}
            />
          </div>
        </div>
      </div>

      <SettingsFormActions
        onCancel={onCancel}
        onSubmit={() => onSubmit(formValues)}
        labels={{
          control01: labels.cancel,
          control02: labels.save,
        }}
      />
    </form>
  </SettingsCard>
);
