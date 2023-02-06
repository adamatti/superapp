/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly APP_ENV: string
  readonly BACKEND_API: string
  readonly HARDCODED_AUTHORIZATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}