import { useDispatch, useSelector } from 'react-redux';
import { AppSettings } from '@/shared/types/settings.type';
import {
  updateSettings,
  selectSettings,
  selectLanguage,
  selectTheme,
} from '../store/settingsSlice';
import { AppDispatch } from '@/shared/services/redux/store';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(selectSettings);
  const language = useSelector(selectLanguage);
  const theme = useSelector(selectTheme);

  return {
    settings,
    language,
    theme,
    updateSettings: (newSettings: Partial<AppSettings>) =>
      dispatch(updateSettings(newSettings)),
  } as const;
};

// This type is useful for components that consume the hook
export type UseSettingsReturn = ReturnType<typeof useSettings>;
