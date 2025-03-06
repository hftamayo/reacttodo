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
    const storedSettings = localStorage.getItem(STORAGE_KEY);
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
  },

  saveSettings: (settings: AppSettings): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  },

  clearSettings: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  updateTheme: (theme: AppSettings['theme']): void => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
};
