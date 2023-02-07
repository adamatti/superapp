import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Auth0Provider } from '@auth0/auth0-react';
import config from './config';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={config.auth0.domain}
                clientId={config.auth0.clientId}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: `https://${config.auth0.domain}/api/v2/`,
                    scope: 'read:current_user update:current_user_metadata',
                }}
            >
                <RouterProvider router={router} />
            </Auth0Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);
