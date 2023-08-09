// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

import libCss from 'vite-plugin-libcss';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'YunMuFeed',
      // the proper extensions will be added
      fileName: 'yun-mu-feed',
    },
    rollupOptions: {
    },
  },
  plugins: [
    libCss()
  ]
})