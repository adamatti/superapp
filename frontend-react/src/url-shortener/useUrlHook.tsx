import { useCallback, useState } from 'react';
import useToken from '~/auth/useToken';
import config from '~/config';
import { type Url } from './types';

const baseUrl = `${config.backendAPI}/api/url-shortener/urls`;

function useUrlHook() {
  const { getToken } = useToken();

  return {
    listUrls: useCallback(async (): Promise<Url[]> => {
      const authToken = await getToken();
      const response = await fetch(baseUrl, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      return await response.json();
    }, [getToken]),

    saveUrl: useCallback(
      async (url: Url): Promise<Url> => {
        const authToken = await getToken();
        const response = await fetch(`${baseUrl}/${url.id || ''}`, {
          method: url.id ? 'POST' : 'PUT',
          body: JSON.stringify(url),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken}`,
          },
        });

        return await response.json();
      },
      [getToken],
    ),

    deleteUrl: useCallback(
      async (id: number): Promise<void> => {
        const authToken = await getToken();

        await fetch(`${baseUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken}`,
          },
        });
      },
      [getToken],
    ),
  };
}

export default useUrlHook;
