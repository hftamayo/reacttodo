import React from 'react';
import { Link } from 'wouter';
import logoCompany from '../../../../shared/assets/tamayo.png';

export const Logo: React.FC = () => {
  return (
    <div>
      <Link href="/">
        <img src={logoCompany} alt="Company Logo" />
      </Link>
    </div>
  );
};
