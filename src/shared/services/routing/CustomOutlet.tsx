import React from 'react';
import { Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { SignUpContainer } from '@/containers/Auth/SignUpContainer';
import { LoginContainer } from '@/containers/Auth/LoginContainer';
import { LogoutContainer } from '@/containers/Auth/LogoutContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';
import { useAuth } from '@/features/auth/hooks/core/AuthContext';
import { AuthGuard } from '@/features/auth/hooks/core/AuthGuard';
import { MainLayout } from '@/shared/components/ui/layout/dashboard/MainLayout';

export const CustomOutlet: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {/* Universal Entry Point */}
      <Route path="/" component={LandingContainer} />

      {/* Public Routes */}
      <Route path="/landing" component={LandingContainer} />

      {/* Authentication Routes */}
      <Route path="/auth/login" component={LoginContainer} />
      <Route path="/auth/signup" component={SignUpContainer} />
      <Route path="/auth/logout" component={LogoutContainer} />

      {/* Protected Routes - Dashboard with MainLayout wrapper */}
      <Route path="/dashboard">
        {isAuthenticated ? (
          <AuthGuard>
            <MainLayout>
              <DashBoardContainer />
            </MainLayout>
          </AuthGuard>
        ) : (
          <LandingContainer />
        )}
      </Route>

      <Route path="/dashboard/analytics">
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

      <Route path="/dashboard/tasks">
        {isAuthenticated ? (
          <AuthGuard>
            <MainLayout>
              <TaskBoardContainer />
            </MainLayout>
          </AuthGuard>
        ) : (
          <LandingContainer />
        )}
      </Route>

      {/* Fallback Route for unknown paths */}
      <Route path="*" component={LandingContainer} />
    </Switch>
  );
};
