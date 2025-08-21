import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthState } from '@/features/auth/hooks/core/useAuthState';
import { DashBoardAnalyticsSkeleton } from '@/shared/components/ui/skeleton/DashBoardAnalyticsSkeleton';
import LandingPresenter from './LandingPresenter';

export const LandingContainer: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthState();
  const [, setLocation] = useLocation();

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation('/dashboard');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return <DashBoardAnalyticsSkeleton />;
  }

  // Only show landing page for non-authenticated users
  return <LandingPresenter />;
};
