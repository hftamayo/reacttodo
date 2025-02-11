import React from 'react';
import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const DashBoardFooter = () => {
  const { text: statusOn } = useTranslation('statusOn');
  const { text: statusOff } = useTranslation('statusOff');
  const { text: suggestions } = useTranslation('suggestions');
  const { text: serviceDesk } = useTranslation('serviceDesk');

  return (
    <footer className="flex justify-between items-center bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="flex items-center">
        <span>Developed by Tamayo & Co, follow us on:</span>
        <a
          href="https://www.facebook.com"
          className={DashBoardFooterStyles.footer_links}
        >
          <FaFacebook />
        </a>{' '}
        <a
          href="https://www.twitter.com"
          className={DashBoardFooterStyles.footer_links}
        >
          <FaTwitter />
        </a>{' '}
        <a
          href="https://www.tiktok.com"
          className={DashBoardFooterStyles.footer_links}
        >
          <FaTiktok />
        </a>
      </div>
      <div className="flex">
        <span className={DashBoardFooterStyles.footer_text}>{statusOn}</span> |
        <a href="{}" className={DashBoardFooterStyles.footer_links}>
          {suggestions}
        </a>{' '}
        |
        <a href="{}" className={DashBoardFooterStyles.footer_links}>
          {serviceDesk}
        </a>
      </div>
    </footer>
  );
};
