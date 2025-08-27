import React from 'react';
import { Switch, Route } from 'wouter';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';
import { AuthGuard } from '@/features/auth/hooks/core/AuthGuard';
import { MainLayout } from '@/shared/components/ui/layout/dashboard/MainLayout';

export const CustomOutlet: React.FC = () => {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/landing" component={LandingContainer} />

      {/* Protected Routes - Single AuthGuard for all dashboard routes */}
      <Route path="/dashboard">
        <AuthGuard>
          <MainLayout>
            <DashBoardContainer />
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
