import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, selectTheme } from '@/features/settings/store/settingsSlice';
import { Theme } from '@/shared/types/settings.type';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const handleToggle = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
