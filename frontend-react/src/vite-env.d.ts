/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_API: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
