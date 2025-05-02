import React from 'react';
import { useSettings } from '@/features/settings/hooks/useSettings';

export const ThemeToggle: React.FC = () => {
  const { theme, updateSettings } = useSettings();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
