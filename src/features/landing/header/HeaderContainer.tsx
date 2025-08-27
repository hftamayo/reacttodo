import React from 'react';
import HeaderLayout from './components/HeaderLayout';

export const HeaderContainer: React.FC = () => {
  return (
    <header
      className="
      w-full 
      h-14 sm:h-16 md:h-18 lg:h-20
      flex-shrink-0
      bg-white 
      shadow-sm 
      border-b border-gray-200
      z-10
    "
    >
      <HeaderLayout />
    </header>
  );
};
