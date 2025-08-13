import React from 'react';
import { HeaderContainer } from '@/features/landing/header/HeaderContainer';
import { ContentContainer } from '@/features/landing/content/ContentContainer';
import { FooterContainer } from '@/features/landing/footer/FooterContainer';

const LandingPresenter: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <ContentContainer />
      <FooterContainer />
    </div>
  );
};

export default LandingPresenter;
