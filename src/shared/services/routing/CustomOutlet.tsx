import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import SkeletonDashBoardAnalytics from '@/shared/components/ui/skeleton/SkeletonDashBoardAnalytics';
import TaskBoard from '@/containers/TaskBoard';

const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {match && <Route path="/" component={SkeletonDashBoardAnalytics} />}
      <Route path="/taskboard" component={TaskBoard} />
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default CustomOutlet;
