import React, { useEffect, useState } from 'react';
import { AuthContext, initialState } from './AuthContext';
import firebase from 'firebase/compat/app';
import AuthLocalStorage from './AuthLocalStorage';
import config from '~/config';

firebase.initializeApp(config.firebase);

interface AuthProviderOptions {
  children: React.ReactElement;
}

function AuthProvider(options: AuthProviderOptions) {
  const { token: localToken, authenticated: localAuthenticated } = AuthLocalStorage.load();
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState(localToken);
  const [isAuthenticated, setIsAuthenticaded] = useState(localAuthenticated);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      let token: string | null = null;
      if (user) {
        token = await user?.getIdToken();
        if (token) {
          setToken(token);
        }
      }
      AuthLocalStorage.store(token, !!user);
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
