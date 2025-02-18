import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { HealthCheck } from '@/shared/services/hc/HealthCheck';

export const DashBoardFooter: React.FC = () => {
  const [statOn, setStatOn] = useState<string>('Checking status...');
  const { text: suggestions } = useTranslation('suggestions');
  const { text: serviceDesk } = useTranslation('serviceDesk');

  const statusClass =
    statOn === 'Online'
      ? DashBoardFooterStyles.footer_text
      : DashBoardFooterStyles.footer_text_offline;

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
        <HealthCheck setStatus={setStatOn} />
        <span className={statusClass}>{statOn}</span> |
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
