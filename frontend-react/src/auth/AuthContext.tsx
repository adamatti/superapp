import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const initialState = {
  isAuthenticated: false,

  user: {
    displayName: '',
  },

  getToken: () => '',

  logout: async () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    await firebase.auth().signOut();
    window.location.href = '/';
  },
};

export const AuthContext = React.createContext(initialState);
