import { AppSettings } from '@/shared/types/settings.type';
const STORAGE_KEY = 'app_settings';

const defaultSettings: AppSettings = {
  language: 'en',
  theme: 'light',
  timezone: 'UTC',
  fontSize: 12,
};

export const settingsService = {
  getSettings: (): AppSettings => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  },

  saveSettings: (settings: Partial<AppSettings>): void => {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));

    // Apply theme if it was updated
    if (settings.theme) {
      this.applyTheme(settings.theme);
    }
  },

  resetToDefaults: (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    this.applyTheme(defaultSettings.theme);
  },

  clearSettings: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    this.applyTheme('light'); // Reset to light theme when clearing
  },

  // Private helper method
  applyTheme: (theme: AppSettings['theme']): void => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  },
};
