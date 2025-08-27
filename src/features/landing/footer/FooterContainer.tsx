import React from 'react';
import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { DashBoardFooterStyles } from '@/shared/utils/twind/styles';
import { SocialLink } from '@/shared/types/dashboard/footer.type';

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

export const FooterContainer: React.FC = () => {
  const handleSocialClick =
    (url: string, label: string) => (e: React.MouseEvent) => {
      // You might want to add analytics tracking here
      if (!url) {
        e.preventDefault();
        console.warn(`Invalid URL for ${label}`);
      }
    };

  return (
    <footer
      className="
      flex-shrink-0
      bg-[var(--footer-bg)] 
      text-[var(--footer-text)]
      px-4 sm:px-6 md:px-8 lg:px-20
      py-4 sm:py-6
      border-t border-gray-200
    "
    >
      <div
        className="
        flex flex-col sm:flex-row 
        justify-between 
        items-center 
        gap-4 sm:gap-0
        max-w-7xl mx-auto
      "
      >
        <div
          className="
          flex flex-col sm:flex-row 
          items-center 
          gap-2 sm:gap-4
        "
        >
          <span
            className="
            text-xs sm:text-sm md:text-base
            text-center sm:text-left
          "
          >
            Developed by Tamayo & Co, follow us on:
          </span>

          <div className="flex items-center gap-3 sm:gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                className={`
                  ${DashBoardFooterStyles.footer_links}
                  p-2 sm:p-1
                  hover:bg-gray-100 
                  rounded-full
                  transition-colors duration-200
                `}
                onClick={handleSocialClick(url, label)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
              >
                <Icon
                  className="
                  w-4 h-4 sm:w-5 sm:h-5 
                  hover:opacity-80 
                  transition-opacity
                "
                />
              </a>
            ))}
          </div>
        </div>

        <div
          className="
          text-xs sm:text-sm 
          text-center sm:text-right
        "
        >
          © 2025 ReactTodo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
