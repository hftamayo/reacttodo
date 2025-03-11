import { useState } from 'react';
import { useSettings } from './useSettings';
import {
  useSettingsFormProps,
  AppSettings,
} from '@/shared/types/settings.type';
import { showError } from '@/shared/services/notification/notificationService';

export const useSettingsForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: useSettingsFormProps) => {
  const [formValues, setFormValues] = useState<AppSettings>(initialValues);
  const { updateSettings } = useSettings();

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
      await updateSettings(formValues);
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
    formValues,
    handlers: {
      handleSettingChange,
      submitHandler,
      cancelHandler,
    },
  };
};

export type UseSettingsFormReturn = ReturnType<typeof useSettingsForm>;
