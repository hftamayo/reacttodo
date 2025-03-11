import { useDispatch, useSelector } from 'react-redux';
import { AppSettings } from '@/shared/types/settings.type';
import {
  setLanguage,
  setTheme,
  updateSettings,
  selectSettings,
} from '../store/settingsSlice';
import { AppDispatch } from '@/shared/services/redux/store';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(selectSettings);

  return {
    settings,
    setLanguage: (lang: AppSettings['language']) => dispatch(setLanguage(lang)),
    setTheme: (theme: AppSettings['theme']) => dispatch(setTheme(theme)),
    updateSettings: (newSettings: Partial<AppSettings>) =>
      dispatch(updateSettings(newSettings)),
  } as const;
};

export type UseSettingsReturn = ReturnType<typeof useSettings>;
