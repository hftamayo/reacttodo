import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { DashBoardAnalytics } from '@/features/dashboard/components/content/DashBoardAnalytics';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';

export const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {match && <Route path="/" component={DashBoardAnalytics} />}
      <Route path="/taskboard" component={TaskBoardContainer} />
      {/* Add more routes as needed */}
    </Switch>
  );
};
