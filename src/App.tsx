import React from 'react';
import { Router } from 'wouter';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from './shared/services/redux/store';
import { LandingContainer } from './containers/Landing/LandingContainer';
import { DashBoardContainer } from './containers/DashBoard/DashBoardContainer';
import { AuthGuard } from './features/auth/hooks/core/AuthGuard';
import { useAuthState } from './features/auth/hooks/core/useAuthState';
import { GlobalModalContainer } from './shared/components/modal/GlobalModalContainer';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthState();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {isAuthenticated ? (
            <AuthGuard>
              <DashBoardContainer />
            </AuthGuard>
          ) : (
            <LandingContainer />
          )}
        </Router>
        <Toaster position="bottom-left" />
        <GlobalModalContainer />
      </QueryClientProvider>
    </Provider>
  );
};
