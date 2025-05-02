import { useMemo } from 'react';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { selectDropDownItems, selectMainMenuItems } from '../store/menuSlice';
import { menuService } from '../services/menuService';

export const useMenuOptions = (userRole: string) => {
  const dropDownItems = useAppSelector(selectDropDownItems);
  const mainMenuItems = useAppSelector(selectMainMenuItems);
  const { group } = useTranslation('sideBarDashboard');

  return useMemo(() => {
    if (!group) {
      return {
        dropdownItems: [],
        mainMenuItems: [],
      };
    }

    const translatedDropdownItems = menuService
      .filterItemsByRole(dropDownItems, userRole)
      .map((item) => ({
        ...item,
        label: group[item.label] || item.label,
      }));

    const translatedMainItems = menuService
      .filterItemsByRole(mainMenuItems, userRole)
      .map((item) => ({
        ...item,
        label: group[item.label] || item.label,
      }));

    return {
      dropdownItems: translatedDropdownItems,
      mainMenuItems: translatedMainItems,
    };
  }, [dropDownItems, mainMenuItems, group, userRole]);
};
