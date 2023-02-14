import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AuthLocalStorage from './AuthLocalStorage';

export const initialState = {
  isAuthenticated: false,

  user: {
    displayName: '',
  },

  getToken: () => '',

  logout: async () => {
    AuthLocalStorage.clean();
    await firebase.auth().signOut();
    window.location.href = '/';
  },
};

export const AuthContext = React.createContext(initialState);
