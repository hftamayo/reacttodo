import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useAppDispatch } from '@/shared/services/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/services/redux/hooks/useAppSelector';
import { toggleTheme } from '@/shared/services/redux/slices/themeSlice';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

const ThemeButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.theme.theme);
  const { text: textOn } = useTranslation('themeButtonOn');
  const { text: textOff } = useTranslation('themeButtonOff');

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center text-xl mr-4">
      {theme === 'light' ? (
        <FaToggleOff
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
          title={textOff}
        />
      ) : (
        <FaToggleOn
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
          title={textOn}
        />
      )}
    </div>
  );
};

export default ThemeButton;
