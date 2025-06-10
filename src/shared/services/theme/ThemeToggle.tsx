import React from 'react';
import { useSettingsForm } from '@/features/settings/hooks/useSettingsForm';
import { updateSettings } from '@/features/settings/store/settingsSlice';
import { settingsService } from '@/features/settings/services/SettingsService';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSettingsForm({
    onSubmit: () => {},
    onCancel: () => {},
  });

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const updatedSettings = settingsService.getSettings();
    const newSettings = {
      ...updatedSettings,
      theme: newTheme,
    };

    //settingsService.saveSettings(newSettings);
    //dispatch(updateSettings(newSettings));
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
