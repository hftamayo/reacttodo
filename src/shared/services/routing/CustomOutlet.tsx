import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { DashBoardContainer } from '@/containers/DashBoard/DashBoardContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';
import { SignUpContainer } from '@/containers/Auth/SignUpContainer';
import { LoginContainer } from '@/containers/Auth/LoginContainer';
import { LandingContainer } from '@/containers/Landing/LandingContainer';

export const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {/* Landing/Public Routes */}
      <Route path="/landing" component={LandingContainer} />

      {/* Authentication Routes */}
      <Route path="/auth/login" component={LoginContainer} />
      <Route path="/auth/signup" component={SignUpContainer} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" component={DashBoardContainer} />
      <Route
        path="/dashboard/analytics"
        component={DashBoardAnalyticsContainer}
      />
      <Route path="/dashboard/tasks" component={TaskBoardContainer} />

      {/* Default Route - redirect to analytics dashboard when authenticated */}
      {match && <Route path="/" component={DashBoardAnalyticsContainer} />}

      {/* Fallback Route for unknown paths */}
      <Route path="*" component={LandingContainer} />
    </Switch>
  );
};
