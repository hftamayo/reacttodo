import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
