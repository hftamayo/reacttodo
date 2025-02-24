import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { DashBoardAnalyticsContainer } from '@/containers/DashBoard/DashBoardAnalyticsContainer';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';

export const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {match && <Route path="/" component={DashBoardAnalyticsContainer} />}
      <Route path="/taskboard" component={TaskBoardContainer} />
      {/* Add more routes as needed */}
    </Switch>
  );
};
