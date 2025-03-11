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
  const [formValues, setFormValues] = useState(initialValues);
  const { updateSettings } = useSettings();

  const handleLanguageChange = (value: AppSettings['language']) => {
    setFormValues((prev) => ({ ...prev, language: value }));
  };

  const handleThemeChange = (value: AppSettings['theme']) => {
    setFormValues((prev) => ({ ...prev, theme: value }));
  };

  const handleTimeZoneChange = (value: AppSettings['timezone']) => {
    setFormValues((prev) => ({ ...prev, timezone: value }));
  };

  const handleFontSizeChange = (value: AppSettings['fontsize']) => {
    setFormValues((prev) => ({ ...prev, fontSize: Number(value) }));
  };

  const handleBackUpChange = (value: AppSettings['backup']) => {
    setFormValues((prev) => ({ ...prev, backUp: value }));
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

  const cancelHandler = () => {
    setFormValues(initialValues);
    onCancel();
  };

  return {
    formValues,
    handlers: {
      handleLanguageChange,
      handleThemeChange,
      handleTimeZoneChange,
      handleFontSizeChange,
      handleBackUpChange,
      submitHandler,
      cancelHandler,
    },
  };
};
