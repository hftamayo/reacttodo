import { useAppSelector } from './useAppSelector';
import { selectLanguage } from '@/features/settings/store/settingsSlice';
import { stringMessages } from '@/shared/utils/languages/stringMessages';
import { LanguageContextType } from '@/shared/types/settings.type';

export const useTranslation = (key: keyof LanguageContextType) => {
  const language = useAppSelector(selectLanguage);
  return stringMessages[key][language] || {};
};
