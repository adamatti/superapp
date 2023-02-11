import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import config from '~/config';

function useToken() {
  const { getAccessTokenSilently } = useAuth0();

  const getToken = useCallback(async (): Promise<string> => {
    return await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${config.auth0.domain}/api/v2/`,
        scope: 'read:current_user',
      },
    });
  }, [getAccessTokenSilently]);

  return {
    getToken,
  };
}

export default useToken;
