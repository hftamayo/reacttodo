import React from 'react';
import { Link } from 'wouter';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/services/redux/storeHooks';
import { toggleTheme } from '@/shared/services/redux/slices/themeSlice';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';

const ThemeButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center text-xl mr-4">
      {theme === 'light' ? (
        <FaToggleOff
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
        />
      ) : (
        <FaToggleOn
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
        />
      )}
    </div>
  );
};

export default ThemeButton;
