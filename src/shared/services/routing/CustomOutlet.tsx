import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { SignUpContainer } from '@/containers/Auth/SignUpContainer';
import { LoginContainer } from '@/containers/Auth/LoginContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';
import { useAuthState } from '@/features/auth/hooks/core/useAuthState';
import { AuthGuard } from '@/features/auth/hooks/core/AuthGuard';

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
      
      {/* Protected Routes - Only for authenticated users */}
      <Route path="/dashboard">
        {isAuthenticated ? (
          <AuthGuard>
            <DashBoardContainer />
          </AuthGuard>
        ) : (
          <LandingContainer />
        )}
      </Route>
      
      <Route path="/dashboard/analytics">
        {isAuthenticated ? (
          <AuthGuard>
            <DashBoardAnalyticsContainer />
          </AuthGuard>
        ) : (
          <LandingContainer />
        )}
      </Route>
      
      <Route path="/dashboard/tasks">
        {isAuthenticated ? (
          <AuthGuard>
            <TaskBoardContainer />
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
              <DashBoardAnalyticsContainer />
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
