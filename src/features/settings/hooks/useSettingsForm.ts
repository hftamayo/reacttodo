import { useState } from 'react';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { AppSettings, SettingsFormProps } from '@/shared/types/settings.type';
import {
  updateSettings,
  selectSettings,
  selectLanguage,
  selectTheme,
} from '../store/settingsSlice';
import { showError } from '@/shared/services/notification/notificationService';

export const useSettingsForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: SettingsFormProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [formValues, setFormValues] = useState<AppSettings>(initialValues);

  const handleSettingChange = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: key === 'fontSize' ? Number(value) : value,
    }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      dispatch(updateSettings(formValues));
      onSubmit(formValues);
    } catch (error) {
      showError('Failed to update settings');
    }
  };

  const cancelHandler = () => {
    setFormValues(initialValues);
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
