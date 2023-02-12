import { Auth0Provider } from '@auth0/auth0-react';

import config from '~/config';

interface AuthProviderOptions {
  children: React.ReactElement;
}

function AuthProvider(options: AuthProviderOptions): JSX.Element {
  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://${config.auth0.domain}/api/v2/`,
        // audience: config.auth0.api_audience,
        scope: 'login',
        // scope: 'read:current_user update:current_user_metadata',
      }}
    >
      {options.children}
    </Auth0Provider>
  );
}

export default AuthProvider;
