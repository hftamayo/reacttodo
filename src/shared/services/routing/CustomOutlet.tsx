import React from 'react';
import { useRoute, Switch, Route } from 'wouter';
import { SkeletonDashBoardAnalytics } from '@/shared/components/ui/skeleton/SkeletonDashBoardAnalytics';
import { TaskBoardContainer } from '@/containers/TaskBoard/TaskBoardContainer';

const CustomOutlet: React.FC = () => {
  const [match] = useRoute('/');

  return (
    <Switch>
      {match && <Route path="/" component={SkeletonDashBoardAnalytics} />}
      <Route path="/taskboard" component={TaskBoardContainer} />
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default CustomOutlet;
