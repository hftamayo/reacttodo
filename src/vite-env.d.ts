/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_APP_NAME: string;
  // Add other environment variables here...
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
