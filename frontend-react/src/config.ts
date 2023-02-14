/**
 * Reminder: it shall always use `import.meta.env.NAME` structure to make it work.
 */

const config = {
  backendAPI: import.meta.env.VITE_BACKEND_API,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyCipbfpFveJrDvoEfqcnuUEn4EiHee4L6o',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'adamatti.firebaseapp.com',
  },
};

export default config;
