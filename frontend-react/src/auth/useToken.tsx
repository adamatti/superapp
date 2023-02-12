import { type GetTokenSilentlyOptions, useAuth0, OAuthError } from '@auth0/auth0-react';
import { useCallback } from 'react';
import config from '~/config';

function useToken() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const getToken = useCallback(
    async (scope = 'login'): Promise<string> => {
      const authParams: GetTokenSilentlyOptions = {
        authorizationParams: {
          // audience: config.auth0.audience,
          audience: config.auth0.api_audience,
          // scope: 'read:current_user',
          scope,
          detailedResponse: true,
        },
      };
      try {
        return await getAccessTokenSilently(authParams);
      } catch (error) {
        if (error instanceof OAuthError && error.message === 'Consent required') {
          // return await getAccessTokenWithPopup(authParams);
        }
        throw error;
      }
    },
    [getAccessTokenSilently, config.auth0.api_audience],
  );

  return {
    getToken,
  };
}

export default useToken;
