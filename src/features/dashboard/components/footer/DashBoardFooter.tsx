import React from 'react';
import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';

const DashBoardFooter = () => {
  return (
    <footer className="flex justify-between items-center bg-black text-white">
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
        <a href="{}" className={DashBoardFooterStyles.footer_links}>
          EULA
        </a>{' '}
        |
        <a href="{}" className={DashBoardFooterStyles.footer_links}>
          Customer Support
        </a>{' '}
        |
        <a href="{}" className={DashBoardFooterStyles.footer_links}>
          Service-Desk
        </a>
      </div>
    </footer>
  );
};

export default DashBoardFooter;
