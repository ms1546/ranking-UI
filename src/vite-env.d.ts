/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GRAPHQL_ENDPOINT: string;
    readonly VITE_REGION: string;
    readonly VITE_GRAPHQL_API_KEY: string;
  }

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
