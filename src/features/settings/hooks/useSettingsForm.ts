import { useState } from 'react';
import { useSettings } from './useSettings';
import {
  useSettingsFormProps,
  Language,
  Theme,
} from '@/shared/types/settings.type';
import { showError } from '@/shared/services/notification/notificationService';

export const useSettingsForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: useSettingsFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { updateSettings } = useSettings();

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

  const handleBackUpChange = (value: string) => {
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
