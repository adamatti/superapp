import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import RouterProvider from './RouteProvider';
import { AuthProvider } from './auth';

import './styles/main.scss';
import { Layout } from './layout';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider layout={Layout} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
