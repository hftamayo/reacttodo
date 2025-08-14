import React from 'react';
import { Button } from '@/shared/components/ui/button/Button';

export const ActionButtons: React.FC = () => {
  return (
    <div>
      <Button variant="link">Login</Button>|
      <Button variant="link">Sign Up</Button>
    </div>
  );
};
