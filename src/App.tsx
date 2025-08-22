import React from 'react';
import { Router } from 'wouter';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from './shared/services/redux/store';
import { AuthProvider, useAuth } from './features/auth/hooks/core/AuthContext';
import { GlobalModalContainer } from './shared/components/modal/GlobalModalContainer';
import { CustomOutlet } from './shared/services/routing/CustomOutlet';

const queryClient = new QueryClient();

// Inner App component that uses auth context
const AppContent: React.FC = () => {
  const { isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {/* Let CustomOutlet handle all routing logic */}
      <CustomOutlet />
    </Router>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
          <Toaster position="bottom-left" />
          <GlobalModalContainer />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
