/**
 * Reminder: it shall always use `import.meta.env.NAME` structure to make it work.
 */

const config = {
    backendAPI: import.meta.env.VITE_BACKEND_API,
    auth0: {
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    },
};

export default config;
