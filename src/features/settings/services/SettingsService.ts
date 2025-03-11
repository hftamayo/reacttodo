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
  }

  clearSettings: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  updateTheme: (theme: AppSettings['theme']): void => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
};
