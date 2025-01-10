import { useAppSelector } from './useAppSelector';
import { selectLanguage } from '../slices/languageSlice';

export const useLanguage = () => {
  return useAppSelector(selectLanguage);
};
