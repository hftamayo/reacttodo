import { useDispatch, useSelector } from 'react-redux';
import { AppSettings, Language, Theme } from '@/shared/types/settings.type';
import {
  setLanguage,
  setTheme,
  updateSettings,
  selectSettings,
  selectLanguage,
  selectTheme,
} from '../store/settingsSlice';
import { AppDispatch } from '@/shared/services/redux/store';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(selectSettings);
  const currentLanguage = useSelector(selectLanguage);
  const currentTheme = useSelector(selectTheme);

  return {
    settings,
    language: currentLanguage,
    theme: currentTheme,
    setLanguage: (lang: Language) => dispatch(setLanguage(lang)),
    setTheme: (theme: Theme) => dispatch(setTheme(theme)),
    updateSettings: (newSettings: Partial<AppSettings>) =>
      dispatch(updateSettings(newSettings)),
  } as const;
};

export type UseSettingsReturn = ReturnType<typeof useSettings>;
