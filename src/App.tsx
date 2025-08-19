import React from 'react';
import { Router } from 'wouter';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from './shared/services/redux/store';
import { useAuthState } from './features/auth/hooks/core/useAuthState';
import { GlobalModalContainer } from './shared/components/modal/GlobalModalContainer';
import { CustomOutlet } from './shared/services/routing/CustomOutlet';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const { isLoading } = useAuthState();

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
          {/* Let CustomOutlet handle all routing logic */}
          <CustomOutlet />
        </Router>
        <Toaster position="bottom-left" />
        <GlobalModalContainer />
      </QueryClientProvider>
    </Provider>
  );
};
