import React from 'react';
import { Logo } from './Logo';

export const HeaderLayout: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-2 h-16">
      <Logo />
      <ActionButtons />
    </nav>
  );
};

export default HeaderLayout;
