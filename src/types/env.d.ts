// env.d.ts
/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_ICON_LOCAL_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
