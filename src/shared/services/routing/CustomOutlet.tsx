import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import DashBoardAnalytics from '@/features/dashboard/components/content/DashBoardAnalytics';
import TaskBoard from '@/containers/TaskBoard';

const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {match && <Route path="/" component={DashBoardAnalytics} />}
      <Route path="/taskboard" component={TaskBoard} />
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default CustomOutlet;
