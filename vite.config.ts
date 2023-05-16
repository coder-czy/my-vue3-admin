import { defineConfig } from 'vite'
import { loadEnv as myLoadEnv } from '/@/utils/loadEnv'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'
import { resolve } from 'path'

function pathResolve(path: string) {
  return resolve(process.cwd(), '.', path)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  myLoadEnv(mode)
  return {
    base: '/',
    root: process.cwd(),
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: '~/',
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    plugins: [
      vue(),
      AutoImport({ resolvers: ElementPlusResolver({ importStyle: 'sass' }) }),
      Components({ resolvers: ElementPlusResolver({ importStyle: 'sass' }) }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name: string) => {
              return `element-plus/theme-chalk/${name}.css`
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/@/styles/element/index.scss" as *;`,
        },
      },
    },
  }
})
