import React from 'react';
import { HeaderContainer } from '@/features/landing/header/HeaderContainer';
import { ContentContainer } from '@/features/landing/content/ContentContainer';
import { FooterContainer } from '@/features/landing/footer/FooterContainer';

const LandingPresenter: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed height across all screen sizes */}
      <HeaderContainer />

      {/* Content - Takes remaining space but allows scrolling */}
      <main className="flex-1 flex flex-col">
        <ContentContainer />
      </main>

      {/* Footer - Stays at bottom */}
      <FooterContainer />
    </div>
  );
};

export default LandingPresenter;
