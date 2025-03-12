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
    const currentSettings = settingsService.getSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));

    if (settings.theme) {
      settingsService.applyTheme(settings.theme);
    }
  },

  resetToDefaults: (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    settingsService.applyTheme(defaultSettings.theme);
  },

  clearSettings: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    settingsService.applyTheme('light');
  },

  applyTheme: (theme: AppSettings['theme']): void => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  },
} as const;
