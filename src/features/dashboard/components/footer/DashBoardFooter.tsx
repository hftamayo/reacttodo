import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { HealthCheck } from '@/shared/services/hc/HealthCheck';
import { SocialLink, FooterLink } from '@/shared/types/footer.type';

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: FaFacebook,
    url: 'https://www.facebook.com',
    label: 'Facebook',
  },
  {
    icon: FaTwitter,
    url: 'https://www.twitter.com',
    label: 'Twitter',
  },
  {
    icon: FaTiktok,
    url: 'https://www.tiktok.com',
    label: 'Tiktok',
  },
];

export const DashBoardFooter: React.FC = () => {
  const [status, setStatus] = useState<string>('Checking status...');
  const { text: suggestions = 'Suggestions' } = useTranslation('suggestions');
  const { text: serviceDesk = 'Service Desk' } = useTranslation('serviceDesk');

  const footerLinks: FooterLink[] = [
    {
      href: '{}',
      label: suggestions,
    },
    {
      href: '{}',
      label: serviceDesk,
    },
  ];

  const statusClass =
    status === 'Online'
      ? DashBoardFooterStyles.footer_text
      : DashBoardFooterStyles.footer_text_offline;

  const handleSocialClick =
    (url: string, label: string) => (e: React.MouseEvent) => {
      // You might want to add analytics tracking here
      if (!url) {
        e.preventDefault();
        console.warn(`Invalid URL for ${label}`);
      }
    };

  return (
    <footer className="flex justify-between items-center bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="flex items-center">
        <span className="text-sm">Developed by Tamayo & Co, follow us on:</span>
        {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            className={DashBoardFooterStyles.footer_links}
            onClick={handleSocialClick(url, label)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${label} page`}
          >
            <Icon className="w-5 h-5 hover:opacity-80 transition-opacity" />
          </a>
        ))}
      </div>

      <div className="flex">
        <HealthCheck setStatus={setStatus} />
        <span className={statusClass}>{status}</span> |
        {footerLinks.map(({ href, label }, index) => (
          <React.Fragment key={label}>
            {index > 0 && <span className="mx-2">|</span>}
            <a
              href={href}
              className={DashBoardFooterStyles.footer_links}
              onClick={(e) => {
                if (!href) {
                  e.preventDefault();
                  console.warn(`Invalid href for ${label}`);
                }
              }}
            >
              {label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
};
