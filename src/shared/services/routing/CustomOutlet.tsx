import React from 'react';
import { Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { SignUpContainer } from '@/containers/Auth/SignUpContainer';
import { LoginContainer } from '@/containers/Auth/LoginContainer';
import { LogoutContainer } from '@/containers/Auth/LogoutContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';
import { AuthGuard } from '@/features/auth/hooks/core/AuthGuard';
import { MainLayout } from '@/shared/components/ui/layout/dashboard/MainLayout';

export const CustomOutlet: React.FC = () => {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/landing" component={LandingContainer} />

      {/* Authentication Routes */}
      <Route path="/auth/login" component={LoginContainer} />
      <Route path="/auth/signup" component={SignUpContainer} />
      <Route path="/auth/logout" component={LogoutContainer} />

      {/* Protected Routes - Single AuthGuard for all dashboard routes */}
      <Route path="/dashboard">
        <AuthGuard>
          <MainLayout>
            <DashBoardContainer />
          </MainLayout>
        </AuthGuard>
      </Route>

      <Route path="/dashboard/analytics">
        <AuthGuard>
          <MainLayout>
            <DashBoardAnalyticsContainer />
          </MainLayout>
        </AuthGuard>
      </Route>

      <Route path="/dashboard/tasks">
        <AuthGuard>
          <MainLayout>
            <TaskBoardContainer />
          </MainLayout>
        </AuthGuard>
      </Route>

      {/* Default Route - Landing page for unauthenticated users */}
      <Route path="/" component={LandingContainer} />

      {/* Fallback Route for unknown paths */}
      <Route path="*" component={LandingContainer} />
    </Switch>
  );
};
