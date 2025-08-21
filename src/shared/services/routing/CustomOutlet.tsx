import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { SettingsContainer } from '@/containers/Settings/SettingsContainer';
import { SignUpContainer } from '@/containers/Auth/SignUpContainer';
import { LoginContainer } from '@/containers/Auth/LoginContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';
import { useAuthState } from '@/features/auth/hooks/core/useAuthState';
import { AuthGuard } from '@/features/auth/hooks/core/AuthGuard';
import { MainLayout } from '@/shared/components/ui/layout/dashboard/MainLayout';

export const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');
  const { isAuthenticated } = useAuthState();

  return (
    <Switch>
      {/* Public Routes - Always accessible */}
      <Route path="/landing" component={LandingContainer} />

      {/* Authentication Routes - Only for non-authenticated users */}
      <Route path="/auth/login" component={LoginContainer} />
      <Route path="/auth/signup" component={SignUpContainer} />

      {/* Protected Routes - Single MainLayout wrapper for all dashboard routes */}
      <Route path="/dashboard">
        {isAuthenticated ? (
          <AuthGuard>
            <MainLayout>
              <Switch>
                <Route path="/dashboard" component={DashBoardContainer} />
                <Route
                  path="/dashboard/analytics"
                  component={DashBoardAnalyticsContainer}
                />
                <Route path="/dashboard/tasks" component={TaskBoardContainer} />
                {/* <Route path="/dashboard/settings" component={SettingsContainer} /> */}
              </Switch>
            </MainLayout>
          </AuthGuard>
        ) : (
          <LandingContainer />
        )}
      </Route>

      {/* Default Route */}
      {match && (
        <Route path="/">
          {isAuthenticated ? (
            <AuthGuard>
              <MainLayout>
                <DashBoardAnalyticsContainer />
              </MainLayout>
            </AuthGuard>
          ) : (
            <LandingContainer />
          )}
        </Route>
      )}

      {/* Fallback Route for unknown paths */}
      <Route path="*" component={LandingContainer} />
    </Switch>
  );
};
