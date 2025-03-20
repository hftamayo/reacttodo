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
import { AppSettings, SettingsFormProps } from '@/shared/types/settings.type';
import { showError } from '@/shared/services/notification/notificationService';

export const useSettingsForm = ({ onSubmit, onCancel }: SettingsFormProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [formValues, setFormValues] = useState<AppSettings>(
    settingsService.getSettings()
  );

  const handleSettingChange = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      settingsService.saveSettings(formValues);
      dispatch(updateSettings(formValues));
      onSubmit(formValues);
    } catch (error) {
      showError('Failed to update settings');
    }
  };

  const cancelHandler = () => {
    setFormValues(settingsService.getSettings());
    onCancel();
  };

  return {
    settings,
    language,
    theme,
    formValues,
    handlers: {
      handleSettingChange,
      submitHandler,
      cancelHandler,
    },
  } as const;
};

export type UseSettingsFormReturn = ReturnType<typeof useSettingsForm>;
