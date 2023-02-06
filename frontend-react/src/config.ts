/**
 * Reminder: it shall always use `import.meta.env.NAME` structure to make it work.  
 */

const config = {
  // FIXME remove it
  hardcodedAuthorization: import.meta.env.VITE_HARDCODED_AUTHORIZATION,
  backendAPI: import.meta.env.VITE_BACKEND_API,
}

export default config;
