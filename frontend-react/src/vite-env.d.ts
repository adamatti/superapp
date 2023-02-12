/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_API: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_API_AUDIENCE: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
