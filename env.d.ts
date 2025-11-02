/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_CSC_BASE_URL?: string;
  readonly VITE_CSC_TOKEN?: string;
  readonly VITE_CSC_USE_MOCK?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
