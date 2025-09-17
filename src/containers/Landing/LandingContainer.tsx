import React from 'react';
import { useAuth } from '@/features/auth/hooks/core/AuthContext';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';
import LandingPresenter from './LandingPresenter';

export const LandingContainer: React.FC = () => {
  const { isLoading } = useAuth();

  // Removed auto-redirect - let users choose to stay on landing or go to dashboard
  // The ActionButtons component will show "Go to Dashboard" for authenticated users

  if (isLoading) {
    return <DashBoardAnalyticsSkeleton />;
  }

  // Show landing page for both authenticated and non-authenticated users
  // ActionButtons will display appropriate controls based on auth state
  return <LandingPresenter />;
};
