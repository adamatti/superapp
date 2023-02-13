import React, { useEffect, useState } from 'react';
import { AuthContext, initialState } from './AuthContext';
import firebase from 'firebase/compat/app';

import config from '~/config';

firebase.initializeApp(config.firebase);

interface AuthProviderOptions {
  children: React.ReactElement;
}

function AuthProvider(options: AuthProviderOptions) {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticaded] = useState(localStorage.getItem('authenticated') === 'true');

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
          setToken(token);
        }
      }
      localStorage.setItem('authenticated', `${user ? 'true' : 'false'}`);
      setIsAuthenticaded(!!user);
      setUser(user);
    });

    return () => {
      unregisterAuthObserver();
    }; // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        getToken: () => `${token ?? ''}`,
        isAuthenticated,
        user,
      }}
    >
      {options.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
