import { useAppSelector } from './useAppSelector';
import { selectLanguage } from '../slices/languageSlice';
import stringMessages from '@/shared/utils/languages/stringMessages';
import { LanguageContextType, Language } from '@/shared/types/ui.type';

export const useTranslation = (key: keyof LanguageContextType) => {
  const language = useAppSelector(selectLanguage) as Language;
  return stringMessages[key][language];
};
