import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'wouter';
//import {selectIsAuthenticated, selectUserRole} from
import { PrivateRouteProps } from '@/shared/types/privroutes.type';

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
}) => {
  const [, navigate] = useLocation();
  const isAuthenticated = true;
  const userRole = 'admin';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (roles && !roles.includes(userRole)) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, roles, userRole, navigate]);

  if (!isAuthenticated || (roles && !roles.includes(userRole))) {
    return null; // Render nothing while redirecting
  }

  return <Component />;
};

export default PrivateRoute;
