import React from 'react';
import { Router } from 'wouter';
import { LandingContainer } from './containers/Landing/LandingContainer';
import { DashboardContainer } from './containers/Dashboard/DashboardContainer';
import { AuthGuard } from './shared/components/auth/AuthGuard';
import { useAuthState } from './features/auth/hooks/useAuthState';

export const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthState();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated ? (
        <AuthGuard>
          <DashboardContainer />
        </AuthGuard>
      ) : (
        <LandingContainer />
      )}
    </Router>
  );
};
