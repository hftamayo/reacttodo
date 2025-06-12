import { useState } from 'react';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import {
  updateSettings,
  selectSettings,
  selectLanguage,
  selectTheme,
} from '../store/settingsSlice';
import { settingsService } from '../services/SettingsService';
import {
  AppSettings,
  SettingsFormProps,
  UseSettingsFormHandlers,
} from '@/shared/types/settings.type';
import { showError } from '@/shared/services/notification/notificationService';

type SettingsFormHook = Pick<SettingsFormProps, 'onSubmit' | 'onCancel'>;

export const useSettingsForm = ({ onSubmit, onCancel }: SettingsFormHook) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [formValues, setFormValues] = useState<AppSettings>(
    settingsService.getSettings()
  );

  const handlers: UseSettingsFormHandlers = {
    handleSettingChange: <K extends keyof AppSettings>(
      key: K,
      value: AppSettings[K]
    ) => {
      setFormValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    },

    submitHandler: (event: React.FormEvent) => {
      event.preventDefault();
      (async () => {
        try {
          settingsService.saveSettings(formValues);
          dispatch(updateSettings(formValues));
          onSubmit(formValues);
        } catch (error) {
          console.error('Error updating settings:', error);
          showError('Failed to update settings');
        }
      })();
    },

    cancelHandler: () => {
      setFormValues(settingsService.getSettings());
      onCancel();
    },
  };

  return {
    settings,
    language,
    theme,
    formValues,
    handlers,
  } as const;
};

export type UseSettingsFormReturn = ReturnType<typeof useSettingsForm>;
