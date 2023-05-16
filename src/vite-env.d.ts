/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB_APP_SHORT_NAME: string
  readonly VITE_GLOB_APP_TITLE: string
  readonly VITE_PORT: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
