/**
 * Reminder: it shall always use `import.meta.env.NAME` structure to make it work.
 */

const config = {
  backendAPI: import.meta.env.VITE_BACKEND_API,
  auth0: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
    api_audience: import.meta.env.VITE_AUTH0_API_AUDIENCE || 'https://adamatti.fly.dev/',
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  },
};

export default config;
