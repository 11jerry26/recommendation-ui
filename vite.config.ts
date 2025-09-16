import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxtorem from 'postcss-pxtorem';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
import { resolve } from 'path'
export default defineConfig({
  plugins: [
     vue(),
     Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16, 
          unitPrecision: 5,
          selectorBlackList: ['.norem'],
          propList: ['*', '!border'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
        }),
      ],
    },
  },
})
